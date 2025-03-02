import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import { adminAuth } from '../../src/config/firebase-admin.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/createCustomToken', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const customToken = await adminAuth.createCustomToken(decodedToken.uid, {
      isAdmin: req.body?.isAdmin || false,
      email: decodedToken.email || '',
    });

    return res.json({ token: customToken });
  } catch (error) {
    console.error('Token error:', error);
    return res.status(error.code === 'auth/invalid-token' ? 401 : 500)
      .json({ error: error.message });
  }
});

export const handler = serverless(app);
