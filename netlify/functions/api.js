import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Your API routes
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Netlify Functions!' });
});

// Handle JWT auth
app.post('/api/auth/token', (req, res) => {
  // Your auth logic here
  res.json({ token: 'sample-token' });
});

export const handler = serverless(app);