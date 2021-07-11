import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Button,
  Stack,
  Container,
  FormControl,
  Input,
  Heading,
} from "@chakra-ui/react";
import { Navbar } from "../../components/Navbar";

export const Search = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const searchForUser = () => {
    navigate(`/search?user=${searchText}`);
  };

  return (
    <Box fontFamily={"default.heading"}>
      <Navbar />
      <Box
        fontFamily={"default.heading"}
        backgroundColor={"brand.primary"}
        px={4}
      >
        <Box my={"10"} maxW={"8xl"} mx={"auto"}>
          <Heading
            fontFamily={"default.heading"}
            color={"brand.white"}
            py={2}
            marginBottom={"10"}
            fontWeight={"400"}
          >
            Search Users Here
          </Heading>
          <Box>
            <Container
              minW={"full"}
              boxShadow={"md"}
              borderColor={"brand.ternary"}
              border={"1px"}
              rounded={"lg"}
              p={6}
              direction={"column"}
            >
              <Stack
                direction={{ base: "column", md: "row" }}
                as={"form"}
                spacing={"12px"}
              >
                <FormControl>
                  <Input
                    variant={"solid"}
                    border={"1px"}
                    color={"brand.offWhite"}
                    _placeholder={{
                      color: "brand.offWhite",
                    }}
                    height={"12"}
                    maxW={"10xl"}
                    borderColor={"brand.ternary"}
                    backgroundColor={"brand.secondary"}
                    id={"text"}
                    type={"text"}
                    required
                    placeholder={"Start Searching..."}
                    aria-label={"Start Searching..."}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </FormControl>

                <Button
                  backgroundColor={"brand.button"}
                  color={"brand.white"}
                  variant={"solid"}
                  border={"1px"}
                  borderColor={"brand.button"}
                  fontSize={"lg"}
                  display={"block"}
                  h={"12"}
                  _hover={{
                    border: "1px",
                    borderColor: "brand.button",
                    color: "brand.white",
                    background: "brand.primary",
                  }}
                  fontWeight={"400"}
                  type="button"
                  w={"28"}
                  onClick={searchForUser}
                >
                  Submit
                </Button>
              </Stack>
            </Container>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
