import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  CardBody,
  Button,
  VStack,
  Heading,
  Alert,
  AlertIcon,
  Text,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';

function SignIn() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      login();
      // The redirect will be handled by the AuthContext login handler
    } catch (error) {
      setError(error.message);
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
            <VStack spacing={6}>
              <Heading size="md" color="white" fontWeight="500">
                Sign in to your account
              </Heading>

              <Text color="gray.300" textAlign="center">
                Click below to sign in with GitHub
              </Text>

              <Button
                onClick={handleSignIn}
                width="full"
                size="lg"
                isLoading={loading}
                loadingText="Signing in"
                colorScheme="gray"
                leftIcon={
                  <svg
                    viewBox="0 0 16 16"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                  </svg>
                }
              >
                Sign in with GitHub
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
