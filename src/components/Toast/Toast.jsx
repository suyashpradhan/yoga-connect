import { useToast } from "@chakra-ui/react";

export const Toast = ({ type, message }) => {
  const toast = useToast();
  return toast({
    title: "Account created.",
    description: "Successfully Create Your Account.",
    status: "success",
    duration: 9000,
    isClosable: true,
  });
};
