import React, { useState } from 'react';
import {
  Box,
  Input,
  Button,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Heading,
  HStack,
  Badge,
  Card,
  CardBody,
  Spinner,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';

function UserManager() {
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const searchUser = async () => {
    if (!email.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter an email address',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:8000/.netlify/functions/api/getUserByEmail'
          : '/.netlify/functions/api/getUserByEmail',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch user');
      }

      setUserData(data);
    } catch (error) {
      console.error('Search error:', error); // Debug log
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDisableUser = async () => {
    try {
      const response = await fetch('/api/disableUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid: userData.uid }),
      });

      if (!response.ok) {
        throw new Error('Failed to disable user');
      }

      toast({
        title: 'Success',
        description: 'User has been disabled',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Refresh user data
      searchUser();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    onClose();
  };

  return (
    <Box>
      <VStack spacing={8} align="stretch">
        <Heading size="lg" color="white">
          User Manager
        </Heading>

        <Card variant="elevated" bg="licorice.400">
          <CardBody>
            <VStack spacing={4}>
              <HStack width="100%">
                <Input
                  placeholder="Enter user email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  bg="licorice.300"
                  _hover={{ bg: 'licorice.300' }}
                  _focus={{ bg: 'licorice.300', borderColor: 'chestnut.500' }}
                />
                <Button
                  onClick={searchUser}
                  isLoading={loading}
                  bg="chestnut.600"
                  _hover={{ bg: 'chestnut.700' }}
                  minWidth="100px"
                >
                  Search
                </Button>
              </HStack>

              {loading && <Spinner color="chestnut.500" />}

              {userData && (
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th color="gray.300">Field</Th>
                      <Th color="gray.300">Value</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>UID</Td>
                      <Td>{userData.uid}</Td>
                    </Tr>
                    <Tr>
                      <Td>Email</Td>
                      <Td>{userData.email}</Td>
                    </Tr>
                    <Tr>
                      <Td>Email Verified</Td>
                      <Td>
                        <Badge
                          colorScheme={userData.emailVerified ? 'green' : 'red'}
                        >
                          {userData.emailVerified ? 'Yes' : 'No'}
                        </Badge>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Account Status</Td>
                      <Td>
                        <Badge
                          colorScheme={userData.disabled ? 'red' : 'green'}
                        >
                          {userData.disabled ? 'Disabled' : 'Active'}
                        </Badge>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Created</Td>
                      <Td>
                        {new Date(
                          userData.metadata.creationTime
                        ).toLocaleString()}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Last Sign In</Td>
                      <Td>
                        {userData.metadata.lastSignInTime
                          ? new Date(
                              userData.metadata.lastSignInTime
                            ).toLocaleString()
                          : 'Never'}
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              )}

              {userData && (
                <HStack spacing={4} width="100%" justify="flex-end">
                  <Button
                    colorScheme="red"
                    onClick={onOpen}
                    isDisabled={userData.disabled}
                  >
                    Disable User
                  </Button>
                </HStack>
              )}
            </VStack>
          </CardBody>
        </Card>
      </VStack>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="licorice.400">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Disable User Account
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to disable this user account? This action
              can be reversed later.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDisableUser} ml={3}>
                Disable
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}

export default UserManager;
