import React from 'react';
import { ReactComponent as Logo } from '../assets/react-logo-animated.svg';
import '../styles/logo.css';

const ReactLogo = ({ spin = true, className = '' }) => {
  return (
    <div className="react-logo-container">
      <Logo 
        className={`react-logo ${spin ? 'react-logo-spin' : ''} ${className}`}
        aria-label="React logo"
      />
    </div>
  );
};

export default ReactLogo;