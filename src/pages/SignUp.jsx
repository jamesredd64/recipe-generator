import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
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
  FormErrorMessage,
} from "@chakra-ui/react";

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 6) errors.push("Password must be at least 6 characters long");
    if (!/\d/.test(password)) errors.push("Password must contain at least one number");
    if (!/[A-Z]/.test(password)) errors.push("Password must contain at least one uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("Password must contain at least one lowercase letter");
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    setErrors(prev => ({
      ...prev,
      [name]: null
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      navigate("/login");
    } catch (error) {
      // Handle specific Firebase auth errors
      switch (error.code) {
        case 'auth/email-already-in-use':
          setSubmitError("This email is already registered");
          break;
        case 'auth/invalid-email':
          setSubmitError("Invalid email format");
          break;
        case 'auth/operation-not-allowed':
          setSubmitError("Email/password accounts are not enabled");
          break;
        case 'auth/weak-password':
          setSubmitError("Password is too weak");
          break;
        default:
          setSubmitError(error.message);
      }
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
                      ? errors.password.map((err, idx) => (
                          <div key={idx}>{err}</div>
                        ))
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
                <Alert status="error" borderRadius="md">
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
