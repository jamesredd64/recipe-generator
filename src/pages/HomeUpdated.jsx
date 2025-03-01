import React from 'react';
import '../styles/theme.css';
import { Typography } from '@mui/material';

function HomeUpdated({ user }) {
  return (
    <div className="body">
      <header style={{ backgroundColor: '#014A5B', padding: '10px' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to the App
        </Typography>
      </header>
      {/* Add your other content here */}
    </div>
  );
}

export default HomeUpdated;
