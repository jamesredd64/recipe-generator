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
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useAuth } from '../context/AuthContext';

function RecipeGenerator() {
  const [ingredients, setIngredients] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const { isAuthenticated } = useAuth();
  const toast = useToast();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GOOGLE_API_KEY);

  const generateRecipes = async (ingredientList) => {
    console.log('Generating recipes for ingredients:', ingredientList);
    
    if (!process.env.REACT_APP_GOOGLE_API_KEY) {
      console.error('Google API key is not set');
      throw new Error('API key configuration is missing');
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      console.log('Model initialized successfully');

      const prompt = `Generate 3 recipe suggestions using these ingredients: ${ingredientList.join(', ')}.
      For each recipe, provide:
      1. Recipe name
      2. Cooking time
      3. Difficulty level
      4. Brief description
      5. Main ingredients needed
      Format as JSON with this structure:
      {
        "recipes": [
          {
            "name": "",
            "cookingTime": "",
            "difficulty": "",
            "description": "",
            "ingredients": []
          }
        ]
      }`;

      console.log('Sending prompt to Gemini:', prompt);

      const result = await model.generateContent(prompt);
      console.log('Received raw response from Gemini:', result);

      const response = await result.response;
      console.log('Processed response:', response);

      const parsedResponse = JSON.parse(response.text());
      console.log('Parsed JSON response:', parsedResponse);

      return parsedResponse;
    } catch (error) {
      console.error('Error in generateRecipes:', error);
      throw new Error(`Recipe generation failed: ${error.message}`);
    }
  };

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

    console.log('Processed ingredient list:', ingredientList);

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
      console.log('Starting recipe generation process...');
      const result = await generateRecipes(ingredientList);
      console.log('Successfully generated recipes:', result);
      setRecipes(result.recipes);
      
      toast({
        title: 'Success',
        description: 'Recipes generated successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error in handleSearch:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to generate recipes',
        status: 'error',
        duration: 5000,
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

          {recipes.length > 0 && (
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              {recipes.map((recipe, index) => (
                <Card
                  key={index}
                  variant="elevated"
                  bg="licorice.400"
                  _hover={{ transform: 'scale(1.02)', transition: 'transform 0.2s' }}
                >
                  <CardBody>
                    <Stack spacing={4}>
                      <Heading size="md" color="white">
                        {recipe.name}
                      </Heading>
                      <Text color="gray.300">
                        ⏱️ {recipe.cookingTime}
                      </Text>
                      <Text color="gray.300">
                        📊 {recipe.difficulty}
                      </Text>
                      <Text color="gray.300">
                        {recipe.description}
                      </Text>
                      <Text color="gray.300" fontWeight="bold">
                        Main Ingredients:
                      </Text>
                      <Text color="gray.300">
                        {recipe.ingredients.join(', ')}
                      </Text>
                    </Stack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Container>
    </Box>
  );
}

export default RecipeGenerator;
