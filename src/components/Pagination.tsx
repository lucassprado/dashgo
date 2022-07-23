import { Box, Button, HStack, Text } from "@chakra-ui/react";

export function Pagination() {
  return (
    <HStack
      spacing="6"
      mt="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <Text as="strong">0</Text>-<Text as="strong">10</Text> de <Text as="strong">100</Text>
      </Box>
      <HStack>
        <Button
          size="sm"
          fontSize="xs"
          w="4"
          colorScheme="purple"
          disabled
          _disabled={{
            bg: 'purple.500',
            cursor: 'default'
          }}
        >
          1
        </Button>
        <Button
          size="sm"
          fontSize="xs"
          w="4"
          bg="gray.700"
          _hover={{
            bg: 'gray.500'
          }}
        >
          2
        </Button>
        <Button
          size="sm"
          fontSize="xs"
          w="4"
          bg="gray.700"
          _hover={{
            bg: 'gray.500'
          }}
        >
          3
        </Button>
        <Button
          size="sm"
          fontSize="xs"
          w="4"
          bg="gray.700"
          _hover={{
            bg: 'gray.500'
          }}
        >
          4
        </Button>
      </HStack>
    </HStack>
  );
}