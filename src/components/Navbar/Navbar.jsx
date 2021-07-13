import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Heading,
  Image,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { logoutButtonPressed } from "../../features/authentication/authenticationSlice";

export const Navbar = () => {
  const navigate = useNavigate();
  const userDispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login);

  return (
    <Box
      px={4}
      backgroundColor={"brand.primary"}
      borderBottom={"1px"}
      borderColor={"brand.ternary"}
      fontFamily={"default.headline"}
    >
      <Flex
        maxW={"8xl"}
        h={20}
        mx={"auto"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <HStack spacing={8} alignItems={"center"}>
          <Image
            alt={"logo"}
            objectFit={"contain"}
            height={"4rem"}
            display={{ base: "flex" }}
            src={
              "https://yoga-trivia-assets.s3.ap-south-1.amazonaws.com/Group+453.svg"
            }
          />
          <Link to="/home" style={{ color: "brand.offWhite" }}>
            <Heading
              fontFamily={"default.heading"}
              color="brand.white"
              py={"2"}
              px={"2"}
              _hover={{
                textDecoration: "none",
                bg: "brand.button",
                borderRadius: "md",
              }}
              fontSize={"lg"}
              fontWeight={"400"}
            >
              Home
            </Heading>
          </Link>
          <Link to="/search">
            <Heading
              fontFamily={"default.heading"}
              color="brand.white"
              py={"2"}
              px={"2"}
              _hover={{
                textDecoration: "none",
                bg: "brand.button",
                borderRadius: "md",
              }}
              fontSize={"lg"}
              fontWeight={"400"}
            >
              Search
            </Heading>
          </Link>
        </HStack>
        <Flex alignItems={"center"}>
          <Menu backgroundColor={"brand.secondary"}>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
            >
              <Avatar
                name={`${currentUser.fullName}`}
                src="https://bit.ly/broken-link"
                size={"sm"}
              />
              <ChevronDownIcon
                fontSize={"1.6rem"}
                marginTop={".2rem"}
                marginLeft={".4rem"}
                color={"brand.offWhite"}
              />
            </MenuButton>
            <MenuList
              backgroundColor={"brand.secondary"}
              border={"1px"}
              borderColor={"brand.ternary"}
            >
              <Link
                to={currentUser.userName ? `/${currentUser.userName}` : "/home"}
              >
                <MenuItem
                  color={"brand.offWhite"}
                  _hover={{ color: "brand.white", backgroundColor: "unset" }}
                >
                  Profile
                </MenuItem>
              </Link>
              <MenuDivider />
              <MenuItem _hover={{ backgroundColor: "unset" }}>
                <Button
                  display="block"
                  width="full"
                  backgroundColor="brand.danger"
                  color="brand.white"
                  fontFamily={"default.headline"}
                  onClick={() => {
                    userDispatch(logoutButtonPressed());
                    navigate("/login");
                  }}
                  _hover={{
                    border: "1px",
                    borderColor: "brand.danger",
                    color: "brand.danger",
                    background: "brand.secondary",
                  }}
                >
                  Sign out
                </Button>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};
