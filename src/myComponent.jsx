import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import {
  Input,
  Card,
  CardBody,
  Container,
  SimpleGrid,
  Alert,
  AlertIcon,
  VStack,
  Button,
} from '@chakra-ui/react';
import './styles/theme.css';

function MyComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  // const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Implement Netlify Identity or custom auth here
      setSuccess('Account created successfully!');
      setError(null);
    } catch (error) {
      setError(error.message);
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Implement Netlify Identity or custom auth here
      setSuccess('Signed in successfully!');
      setError(null);
    } catch (error) {
      setError(error.message);
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6}>
        <Card variant="elevated" bg="licorice.400" w="100%">
          <CardBody>
            <VStack as="form" spacing={4}>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                size="lg"
                bg="licorice.300"
                border="1px solid"
                borderColor="licorice.600"
                _hover={{ bg: 'licorice.300' }}
                _focus={{
                  bg: 'licorice.300',
                  borderColor: 'chestnut.600',
                }}
              />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                size="lg"
                bg="licorice.300"
                border="1px solid"
                borderColor="licorice.600"
                _hover={{ bg: 'licorice.300' }}
                _focus={{
                  bg: 'licorice.300',
                  borderColor: 'chestnut.600',
                }}
              />

              <SimpleGrid columns={2} spacing={4} w="100%">
                <Button
                  onClick={handleSignUp}
                  isLoading={loading}
                  bg="chestnut.600"
                  _hover={{ bg: 'chestnut.700' }}
                >
                  Sign Up
                </Button>
                <Button
                  onClick={handleSignIn}
                  isLoading={loading}
                  bg="chestnut.600"
                  _hover={{ bg: 'chestnut.700' }}
                >
                  Sign In
                </Button>
              </SimpleGrid>
            </VStack>
          </CardBody>
        </Card>

        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}

        {success && (
          <Alert status="success" borderRadius="md">
            <AlertIcon />
            {success}
          </Alert>
        )}
      </VStack>
    </Container>
  );
}

export default MyComponent;
