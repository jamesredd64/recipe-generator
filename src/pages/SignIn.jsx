import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
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
  Box,
} from "@chakra-ui/react";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
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
            <VStack as="form" spacing={6} onSubmit={handleSignIn}>
              <Heading size="md" color="white" fontWeight="500">
                Sign in to your account
              </Heading>

              <FormControl>
                <FormLabel color="gray.300">Email</FormLabel>
                <Box
                  sx={{
                    '& input:-webkit-autofill': {
                      '-webkit-box-shadow': '0 0 0 1000px #122d42 inset',
                      '-webkit-text-fill-color': 'white',
                    },
                    '& input:-webkit-autofill:focus': {
                      '-webkit-box-shadow': '0 0 0 1000px #122d42 inset',
                      '-webkit-text-fill-color': 'white',
                    },
                  }}
                >
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    size="lg"
                    bg="licorice.300"
                    _placeholder={{ color: 'gray.500' }}
                    _hover={{ bg: 'licorice.300' }}
                    _focus={{ 
                      bg: 'licorice.300',
                      borderColor: 'chestnut.600'
                    }}
                  />
                </Box>
              </FormControl>

              <FormControl>
                <FormLabel color="gray.300">Password</FormLabel>
                <Box
                  sx={{
                    '& input:-webkit-autofill': {
                      '-webkit-box-shadow': '0 0 0 1000px #122d42 inset',
                      '-webkit-text-fill-color': 'white',
                    },
                    '& input:-webkit-autofill:focus': {
                      '-webkit-box-shadow': '0 0 0 1000px #122d42 inset',
                      '-webkit-text-fill-color': 'white',
                    },
                  }}
                >
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    size="lg"
                    bg="licorice.300"
                    _placeholder={{ color: 'gray.500' }}
                    _hover={{ bg: 'licorice.300' }}
                    _focus={{ 
                      bg: 'licorice.300',
                      borderColor: 'chestnut.600'
                    }}
                  />
                </Box>
              </FormControl>

              <Button
                type="submit"
                width="full"
                size="lg"
                isLoading={loading}
                loadingText="Signing in"
                colorScheme="chestnut"
                bg="chestnut.600"
                _hover={{ bg: 'chestnut.700' }}
              >
                Sign In
              </Button>

              {error && (
                <Alert status="error" borderRadius="md">
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
