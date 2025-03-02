import React from 'react';
import { useNavigate } from 'react-router-dom';
import netlifyIdentity from 'netlify-identity-widget';
import { Button } from '@chakra-ui/react';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    netlifyIdentity.logout();
    netlifyIdentity.on('logout', () => {
      navigate('/signin');
    });
  };

  return (
    <Button
      onClick={handleLogout}
      colorScheme="gray"
      variant="outline"
    >
      Sign Out
    </Button>
  );
}

export default LogoutButton;