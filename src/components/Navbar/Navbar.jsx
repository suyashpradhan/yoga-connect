import React from "react";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Stack,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { logoutButtonPressed } from "../../features/authentication/authenticationSlice";

const Links = ["Home", "Search Users"];

const NavLink = ({ children }) => ({
  /* <Link
    color={"brand.offWhite"}
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: "brand.button",
      color: "brand.white",
    }}
  >
    {children}
  </Link> */
});

export const Navbar = () => {
  const navigate = useNavigate();
  const userDispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login);

  const { isOpen, onOpen, onClose } = useDisclosure();
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
        <IconButton
          size={"md"}
          icon={
            isOpen ? <CloseIcon /> : <HamburgerIcon color={"brand.offWhite"} />
          }
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
          backgroundColor={"brand.secondary"}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Image
            alt={"logo"}
            objectFit={"contain"}
            height={"4rem"}
            display={{ base: "flex", md: "none" }}
            src={
              "https://yoga-trivia-assets.s3.ap-south-1.amazonaws.com/Group+453.svg"
            }
          />
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {/* {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))} */}
          </HStack>
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
                  _hover={{ color: "brand.white" }}
                >
                  Profile
                </MenuItem>
              </Link>
              <MenuDivider />
              <MenuItem>
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

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {/*  {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))} */}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};
