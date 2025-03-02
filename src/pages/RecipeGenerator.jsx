import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Box,
  Container,
  VStack,
  Heading,
  Input,
  Button,
  Card,
  CardBody,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';

function RecipeGenerator() {
  const [ingredients, setIngredients] = useState('');
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const toast = useToast();

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  const handleSearch = async () => {
    if (!ingredients.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter ingredients (comma-separated)',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const ingredientList = ingredients
      .split(',')
      .map(item => item.trim())
      .filter(item => item);

    if (ingredientList.length > 3) {
      toast({
        title: 'Error',
        description: 'Please enter maximum 3 ingredients',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement API call here
      console.log('Searching for recipes with:', ingredientList);
      
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate recipes',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="body">
      <Container maxW="container.lg" pt={8}>
        <VStack spacing={8} align="stretch">
          <Card variant="elevated" bg="licorice.400">
            <CardBody>
              <VStack spacing={6}>
                <Heading size="lg" color="white">
                  Recipe Generator
                </Heading>
                
                <Text color="gray.300">
                  Enter up to 3 ingredients (comma-separated)
                </Text>

                <Input
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="e.g., chicken, rice, tomatoes"
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

                <Button
                  onClick={handleSearch}
                  isLoading={loading}
                  loadingText="Generating..."
                  size="lg"
                  width="full"
                  bg="chestnut.600"
                  _hover={{ bg: 'chestnut.700' }}
                >
                  Generate Recipes
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Box>
  );
}

export default RecipeGenerator;