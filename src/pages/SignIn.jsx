import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  CardBody,
  Input,
  Button,
  VStack,
  Heading,
  Alert,
  AlertIcon,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      let errorMessage = 'An error occurred during sign in';
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password';
          break;
        default:
          errorMessage = error.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="md" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading
          as="h1"
          size="xl"
          textAlign="center"
          color="white"
          fontWeight="500"
        >
          Welcome Back
        </Heading>

        <Card variant="elevated" bg="licorice.400">
          <CardBody>
            <VStack as="form" spacing={6} onSubmit={handleSignIn}>
              <Heading size="md" color="white" fontWeight="500">
                Sign in to your account
              </Heading>

              <FormControl isRequired>
                <FormLabel color="white">Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  bg="white"
                  color="black"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel color="white">Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  bg="white"
                  color="black"
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                width="full"
                isLoading={loading}
              >
                Sign In
              </Button>

              {error && (
                <Alert status="error">
                  <AlertIcon />
                  {error}
                </Alert>
              )}
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
}

export default SignIn;
