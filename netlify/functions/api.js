import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import { adminAuth } from '../../src/config/firebase-admin.js';

const app = express();

app.use(cors({
  origin: process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : ['https://recipe-generator-ai-jr.netlify.app'],
  credentials: true,
}));

app.use(express.json());

app.post('/getUserByEmail', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    console.log('Searching for user with email:', email); // Debug log

    const userRecord = await adminAuth.getUserByEmail(email);
    console.log('User found:', userRecord.toJSON()); // Debug log

    res.json(userRecord.toJSON());
  } catch (error) {
    console.error('Error fetching user:', error); // Debug log
    res.status(404).json({ error: 'User not found' });
  }
});

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
