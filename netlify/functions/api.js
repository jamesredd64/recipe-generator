import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import { auth } from '../../src/firebaseConfig.jsx';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Protected route example
app.get('/api/protected', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization header' });
    }

    const token = authHeader.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Verify Firebase token
    const decodedToken = await auth.verifyIdToken(token);
    res.json({
      message: 'Protected data',
      user: decodedToken.email
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Your other API routes go here

export const handler = serverless(app);
