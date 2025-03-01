import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig.jsx';
import {
  Box,
  Flex,
  Text,
  Button,
  Container,
  HStack,
  ChakraProvider,
  Image,
} from '@chakra-ui/react';
import theme from './styles/theme';
import reactLogo from '../src/assets/reactlogo.webp';
import { setupTokenRefresh, clearTokenRefresh } from './utils/auth';

// Import page components
import Home from './pages/Home.jsx';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/SignIn.jsx';
import UserManager from './components/UserManager';

// Add DEV_MODE constant
const DEV_MODE = true; // Set to false to enable authentication

// Modified Protected Route Component
const ProtectedRoute = ({ children, user }) => {
  if (DEV_MODE) {
    console.warn(
      '⚠️ DEV_MODE is enabled - Protected routes are accessible without authentication'
    );
    return children;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Setup token refresh when user signs in
        await setupTokenRefresh(currentUser.email === 'admin@example.com'); // Replace with your admin check
      } else {
        setUser(null);
        clearTokenRefresh();
      }
    });

    return () => {
      unsubscribe();
      clearTokenRefresh();
    };
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Box bg="licorice.500" color="white" minH="100vh">
        <BrowserRouter>
          <Box as="nav" bg="licorice.400" py={4}>
            <Container maxW="container.xl">
              <Flex align="center" justify="space-between">
                <Flex align="center">
                  <Image
                    src={reactLogo}
                    alt="React Logo"
                    h="50px"
                    w="auto"
                    mr={4}
                    objectFit="contain"
                  />
                  <Text fontSize="xl" fontWeight="500">
                    My React App
                  </Text>
                </Flex>

                <HStack spacing={4}>
                  {user && <Text mr={2}>Welcome, {user.email}</Text>}

                  <Button
                    as={Link}
                    to="/"
                    variant="ghost"
                    _hover={{ bg: 'licorice.300' }}
                  >
                    Home
                  </Button>

                  {user ? (
                    <>
                      <Button
                        as={Link}
                        to="/user-manager"
                        variant="ghost"
                        _hover={{ bg: 'licorice.300' }}
                      >
                        User Manager
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => signOut(auth)}
                        _hover={{ bg: 'licorice.300' }}
                      >
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        as={Link}
                        to="/signup"
                        variant="ghost"
                        _hover={{ bg: 'licorice.300' }}
                      >
                        Sign Up
                      </Button>
                      <Button
                        as={Link}
                        to="/signin"
                        variant="ghost"
                        _hover={{ bg: 'licorice.300' }}
                      >
                        Sign In
                      </Button>
                    </>
                  )}
                </HStack>
              </Flex>
            </Container>
          </Box>

          <Container maxW="container.xl" mt={8} pb={8}>
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route
                path="/user-manager"
                element={
                  <ProtectedRoute user={user}>
                    <UserManager />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </Box>
    </ChakraProvider>
  );
}

export default App;
