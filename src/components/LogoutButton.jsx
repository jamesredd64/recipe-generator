import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';

function LogoutButton() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Button
      onClick={handleLogout}
      colorScheme="red"
      variant="outline"
    >
      Sign Out
    </Button>
  );
}

export default LogoutButton;
