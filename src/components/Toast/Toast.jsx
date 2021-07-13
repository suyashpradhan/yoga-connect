import { chakra, Box, Icon, Flex, useColorModeValue } from "@chakra-ui/react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { clearSignupFlag } from "../../features/authentication/authenticationSlice";
import { Link } from "react-router-dom";

export const Toast = ({ type, message }) => {
  const userDispatch = useDispatch();
  return (
    <Flex
      w="full"
      bg="gray.600"
      p={50}
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        maxW="sm"
        w="full"
        mx="auto"
        bg={useColorModeValue("white", "gray.800")}
        shadow="md"
        rounded="lg"
        overflow="hidden"
      >
        <Flex justifyContent="center" alignItems="center" w={12} bg="green.500">
          <Icon as={IoMdCheckmarkCircle} color="white" boxSize={6} />
        </Flex>

        <Box mx={-3} py={2} px={4}>
          <Box mx={3}>
            <chakra.span
              color={useColorModeValue("green.500", "green.400")}
              fontWeight="bold"
            >
              Success
            </chakra.span>
            <chakra.p
              color={useColorModeValue("gray.600", "gray.200")}
              fontSize="sm"
            >
              Your account has been created!
            </chakra.p>
            <chakra.p>
              <Link to="/login">Login to continue</Link>
            </chakra.p>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};
