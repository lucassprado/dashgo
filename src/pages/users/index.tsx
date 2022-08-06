import { useState } from 'react';
import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Link,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue
} from '@chakra-ui/react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';

import { useUsers, getUsers, User } from '../../services/hooks/useUsers';

import { queryClient } from '../../services/queryClient';
import { api } from '../../services/api';

import { Header } from "../../components/Header";
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';

// interface UserListProps {
//   users: User[];
// }

export default function UserList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFetching, error } = useUsers(currentPage);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`/users/${userId}`)
      return response.data
    }, {
      staleTime: 1000 * 5 * 10, // 10 minutes
    })
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              { !isLoading && isFetching && (
                <Spinner size="sm" ml="4" color="gray.500" />
              ) }
            </Heading>
            
            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="purple"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </NextLink>
          </Flex>

          { isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários.</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" w="8">
                      <Checkbox colorScheme="purple" />
                    </Th>
                    <Th>Usuário</Th>
                    { isWideVersion && <Th>Data de cadastro</Th> }
                    { isWideVersion && <Th w="8"></Th> }
                  </Tr>
                </Thead>
                <Tbody>
                  { data.users.map(user => {
                    return (
                      <Tr key={user.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="purple" />
                        </Td>
                        <Td>
                          <Box>
                            <Link _hover={{
                              color: "purple.300"
                            }}>
                              <Text onMouseEnter={() => handlePrefetchUser(user.id)} fontWeight="bold">{user.name}</Text>
                            </Link>
                            <Text fontSize="sm" color="gray.300">{user.email}</Text>
                          </Box>
                        </Td>
                        { isWideVersion && <Td>{user.createdAt}</Td> }
                        { isWideVersion && (
                          <Td>
                            <Button
                              as="a"
                              size="sm"
                              fontSize="sm"
                              colorScheme="purple"
                              leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                            >
                              { isWideVersion && 'Editar' }
                            </Button>
                          </Td>
                        ) }
                      </Tr>
                    );
                  }) }
                </Tbody>
              </Table>

              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </>
          ) }
        </Box>
      </Flex>
    </Box>
  );
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const { users } = await getUsers(1);
  
//   return {
//     props: {
//       users
//     }
//   }
// } 
