import express from 'express';
import apiRoutes from './api.js';

const app = express();
app.use(express.json());

// API routes
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});