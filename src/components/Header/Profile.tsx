import { Avatar, Box, Flex, Text  } from '@chakra-ui/react';

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      { showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Lucas Prado</Text>
          <Text color="gray.300" fontSize="small">
            lucasntc2201@gmail.com
          </Text>
        </Box>
      )}

      <Avatar size="md" name="Lucas Prado" src="https://github.com/lucassprado.png"/>
    </Flex>
  );
}