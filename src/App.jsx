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
import RecipeGenerator from './pages/RecipeGenerator.jsx';

function NavigationBar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Box
      as="nav"
      bg="blue.600"
      color="white"
      py={4}
      position="sticky"
      top={0}
      zIndex="sticky"
    >
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <HStack spacing={4}>
            <Link to="/">
              <Text fontSize="xl" fontWeight="bold">
                Home
              </Text>
            </Link>
            {isAuthenticated && (
              <Link to="/recipe-generator">
                <Text fontSize="xl">Recipe Generator</Text>
              </Link>
            )}
          </HStack>

          <HStack spacing={4}>
            {!isAuthenticated ? (
              <>
                <Link to="/signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button colorScheme="whiteAlpha">Sign Up</Button>
                </Link>
              </>
            ) : (
              <Button onClick={logout} variant="ghost">
                Sign Out
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
                <Route path="/recipe-generator" element={<RecipeGenerator />} />
              </Routes>
            </Container>
          </Box>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
