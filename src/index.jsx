import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/theme.css';  // Import the new theme
import App from './App.jsx';
import reportWebVitals from './reportWebVitals.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();
