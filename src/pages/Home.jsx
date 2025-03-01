import React from 'react';
import '../styles/theme.css';
import {
  Container,
  Box,
  Heading,
  Text,
  VStack,
  Card,
  CardBody,
} from '@chakra-ui/react';

function Home({ _user }) {
  return (
    <Box className="body">
      <Container maxW="container.lg" pt={8}>
        <VStack spacing={8} align="stretch">
          <Box mb={8}>
            <Heading as="h1" size="2xl" mb={4}>
              Welcome to Our Platform
            </Heading>
            <Text fontSize="xl">
              Discover amazing features and possibilities
            </Text>
          </Box>

          {[...Array(5)].map((_, index) => (
            <Card
              key={index}
              variant="elevated"
              p={4}
              mb={4}
              bg="licorice.400"
              minH="400px"
            >
              <CardBody>
                <Heading as="h2" size="lg" mb={4}>
                  Section {index + 1}
                </Heading>
                <Text mb={4}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Text>
                <Text mb={4}>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                  eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                  in culpa qui officia deserunt mollit anim id est laborum.
                </Text>
                <Text>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                  doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                  veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </Text>
              </CardBody>
            </Card>
          ))}
        </VStack>
      </Container>
    </Box>
  );
}

export default Home;
