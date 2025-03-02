import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  Container,
  ChakraProvider,
  Image,
  Button,
  HStack,
} from '@chakra-ui/react';
import theme from './styles/theme';
import reactLogo from '../src/assets/reactlogo.webp';
import { AuthProvider, useAuth } from './context/AuthContext';
import LogoutButton from './components/LogoutButton';

// Import page components
import Home from './pages/Home.jsx';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/SignIn.jsx';
// import UserManager from './components/UserManager';

function NavigationBar() {
  const { isAuthenticated } = useAuth();

  return (
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
            <Button
              as={Link}
              to="/"
              variant="ghost"
              _hover={{ bg: 'licorice.300' }}
            >
              Home
            </Button>
            {isAuthenticated ? (
              <>
                <Button
                  as={Link}
                  to="/home"
                  variant="ghost"
                  _hover={{ bg: 'licorice.300' }}
                >
                  Users
                </Button>
                <LogoutButton />
              </>
            ) : (
              <>
                <Button
                  as={Link}
                  to="/signin"
                  colorScheme="chestnut"
                  bg="chestnut.600"
                  _hover={{ bg: 'chestnut.700' }}
                >
                  Sign In
                </Button>
              </>
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
        <Box bg="licorice.500" color="white" minH="100vh">
          <BrowserRouter>
            <NavigationBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
