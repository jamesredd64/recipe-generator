import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  Container,
  ChakraProvider,
  Button,
  HStack,
} from '@chakra-ui/react';
import theme from './styles/theme';
import { AuthProvider, useAuth } from './context/AuthContext';

// Import page components
import Home from './pages/Home.jsx';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/SignIn.jsx';

function NavigationBar() {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <Box
      as="nav"
      bg="blue.600"
      color="white"
      py={4}
      position="sticky"
      top={0}
      zIndex={1000}
      width="100%"
    >
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <Text fontSize="xl" fontWeight="bold">My App</Text>

          <HStack spacing={4}>
            <Button as={Link} to="/" variant="ghost" color="white">
              Home
            </Button>

            {isAuthenticated ? (
              <Button onClick={logout} colorScheme="red">
                Logout
              </Button>
            ) : (
              <Button onClick={login} colorScheme="whiteAlpha">
                Login
              </Button>
            )}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Box minH="100vh">
            <NavigationBar />
            <Container maxW="container.xl" py={8}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
              </Routes>
            </Container>
          </Box>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
