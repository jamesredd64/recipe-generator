import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import netlifyIdentity from 'netlify-identity-widget';
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
  FormErrorMessage,
} from '@chakra-ui/react';

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    netlifyIdentity.init();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    return errors;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await netlifyIdentity.open('signup');
      netlifyIdentity.on('signup', user => {
        netlifyIdentity.close();
        navigate('/login');
      });
    } catch (error) {
      setSubmitError(error.message);
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
          Create Account
        </Heading>

        <Card variant="elevated" bg="licorice.400">
          <CardBody>
            <VStack as="form" spacing={6} onSubmit={handleSignUp}>
              <Heading size="md" color="white" fontWeight="500">
                Sign up for your account
              </Heading>

              <FormControl isInvalid={errors.email}>
                <FormLabel color="gray.300">Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  size="lg"
                  _placeholder={{ color: 'gray.500' }}
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.password}>
                <FormLabel color="gray.300">Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  size="lg"
                  _placeholder={{ color: 'gray.500' }}
                />
                {errors.password && (
                  <FormErrorMessage>
                    {Array.isArray(errors.password)
                      ? errors.password.join(', ')
                      : errors.password}
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={errors.confirmPassword}>
                <FormLabel color="gray.300">Confirm Password</FormLabel>
                <Input
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  size="lg"
                  _placeholder={{ color: 'gray.500' }}
                />
                <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                width="full"
                size="lg"
                isLoading={loading}
                loadingText="Signing up"
                colorScheme="chestnut"
                bg="chestnut.600"
                _hover={{ bg: 'chestnut.700' }}
              >
                Sign Up
              </Button>

              {submitError && (
                <Alert status="error">
                  <AlertIcon />
                  {submitError}
                </Alert>
              )}
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
}

export default SignUp;
