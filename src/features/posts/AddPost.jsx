import React from "react";
import {
  Box,
  Avatar,
  Button,
  Stack,
  Container,
  FormControl,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { postButtonPressed, fetchAllPosts } from "./postSlice";
import { Navbar } from "../../components/Navbar";

export const AddPost = () => {
  const toast = useToast();
  const [postData, setPostData] = useState("");
  const navigate = useNavigate();

  const postDispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login);
  const user = useSelector((state) => state.users.users).find(
    (user) => user._id === currentUser._id
  );

  const addPost = () => {
    postDispatch(fetchAllPosts());
    postDispatch(postButtonPressed({ postData }));
    setPostData("");
    setTimeout(() => {
      toast({
        title: "Post Added!",
        status: "success",
        duration: 3000,
        isClosable: true,
        fontFamily: "default.heading",
      });
    }, 1500);
  };

  return (
    <>
      <Box fontFamily={"default.heading"}>
        <Navbar />
        <Box
          fontFamily={"default.heading"}
          backgroundColor={"brand.primary"}
          p={4}
        >
          <Box my={"10"} maxW={"6xl"} mx={"auto"}>
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
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  {user?.profile_picture ? (
                    <Avatar
                      size={"md"}
                      onClick={() => navigate(`/${currentUser.userName}`)}
                    />
                  ) : (
                    <Avatar
                      size={"md"}
                      name={`${currentUser.fullName}`}
                      src="https://bit.ly/broken-link"
                      onClick={() => navigate(`/${currentUser.userName}`)}
                    />
                  )}

                  <FormControl>
                    <Input
                      variant={"solid"}
                      borderWidth={1}
                      color={"brand.offWhite"}
                      _placeholder={{
                        color: "brand.offWhite",
                      }}
                      height={"16"}
                      maxW={"10xl"}
                      marginTop={"1"}
                      borderColor={"brand.secondary"}
                      backgroundColor={"brand.secondary"}
                      id={"email"}
                      type={"email"}
                      required
                      placeholder={"What's the latest?"}
                      aria-label={"What's the latest?"}
                      value={postData}
                      onChange={(e) => setPostData(e.target.value)}
                    />
                  </FormControl>
                </Stack>
                <Button
                  backgroundColor={"brand.button"}
                  color={"brand.white"}
                  variant={"solid"}
                  border={"1px"}
                  borderColor={"brand.button"}
                  fontSize={"md"}
                  display={"block"}
                  h={"10"}
                  _hover={{
                    border: "1px",
                    borderColor: "brand.button",
                    color: "brand.white",
                    background: "brand.primary",
                  }}
                  fontWeight={"500"}
                  type="submit"
                  marginLeft={"auto"}
                  marginTop={"4"}
                  onClick={addPost}
                  disabled={!postData}
                >
                  Send Post
                </Button>
              </Container>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
