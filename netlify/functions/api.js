import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const app = express();

// Initialize Firebase Admin if not already initialized
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const adminAuth = getAuth();

app.use(cors({
  origin: process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://your-netlify-site.netlify.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.post('/api/createCustomToken', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Missing or invalid authorization header');
      return res.status(401).json({ error: 'Unauthorized - Invalid header' });
    }

    const idToken = authHeader.split('Bearer ')[1];
    console.log('Received token verification request');

    try {
      const decodedToken = await adminAuth.verifyIdToken(idToken);
      console.log('Token verified successfully for user:', decodedToken.uid);

      const additionalClaims = {
        isAdmin: req.body?.isAdmin || false,
        email: decodedToken.email || '',
      };

      const customToken = await adminAuth.createCustomToken(decodedToken.uid, additionalClaims);
      console.log('Custom token created successfully');

      return res.json({ token: customToken });
    } catch (verifyError) {
      console.error('Token verification failed:', verifyError);
      return res.status(401).json({
        error: 'Invalid token',
        details: verifyError.message
      });
    }
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
});

export const handler = serverless(app);
