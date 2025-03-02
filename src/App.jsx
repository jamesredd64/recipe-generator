import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  Container,
  ChakraProvider,
  Image,
} from '@chakra-ui/react';
import theme from './styles/theme';
import reactLogo from '../src/assets/reactlogo.webp';
import { AuthProvider } from './context/AuthContext';

// Import page components
import Home from './pages/Home.jsx';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/SignIn.jsx';
import UserManager from './components/UserManager';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
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
                </Flex>
              </Container>
            </Box>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/users" element={<UserManager />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
