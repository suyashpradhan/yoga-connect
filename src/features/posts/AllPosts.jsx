import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Post } from "./Post";
import { Image, Heading, Box, chakra, Button } from "@chakra-ui/react";

export const AllPosts = ({ userPosts }) => {
  let postData = useSelector((state) => state.posts.posts);
  postData = userPosts ? userPosts : postData;
  return (
    <>
      <Box minH={"100vh"} backgroundColor={"brand.primary"}>
        {postData
          .slice(0)
          .reverse()
          .map((post) => (
            <Post post={post} key={post._id} />
          ))}
        {postData.length === 0 && (
          <>
            <Box maxW={"6xl"} mx={"auto"}>
              <Box
                minH={"40vh"}
                display={"flex"}
                justifyContent={"center"}
                alignContent={"center"}
                flexDirection={"column"}
                py={"6"}
              >
                <Image
                  src="https://yoga-trivia-assets.s3.ap-south-1.amazonaws.com/empty-follow.svg"
                  w={"auto"}
                  height={"80"}
                  mx={"auto"}
                  display={"block"}
                ></Image>
                <Heading
                  fontFamily={"default.heading"}
                  fontSize={"lg"}
                  color={"brand.white"}
                  fontWeight={"400"}
                  textAlign={"center"}
                >
                  It seems, No posts in your feed. Lets start by posting
                  something,
                </Heading>
                <Heading
                  fontFamily={"default.heading"}
                  fontSize={"lg"}
                  color={"brand.white"}
                  fontWeight={"400"}
                  textAlign={"center"}
                  marginTop={"6"}
                >
                  Or
                </Heading>
                <Heading
                  fontFamily={"default.heading"}
                  fontSize={"lg"}
                  color={"brand.white"}
                  fontWeight={"400"}
                  textAlign={"center"}
                  marginTop={"6"}
                >
                  Follow your friends to see their posts
                </Heading>
              </Box>
            </Box>
            <chakra.p>
              <Link to="/search">
                <Button
                  fontFamily={"default.heading"}
                  backgroundColor={"brand.button"}
                  color={"brand.white"}
                  variant={"solid"}
                  border={"1px"}
                  borderColor={"brand.button"}
                  fontSize={"md"}
                  display={"block"}
                  mx={"auto"}
                  h={"10"}
                  fontWeight={"400"}
                  type="button"
                  marginTop={"1"}
                  _hover={{
                    border: "1px",
                    borderColor: "brand.button",
                    color: "brand.white",
                    background: "brand.primary",
                  }}
                >
                  Discover Users
                </Button>
              </Link>
            </chakra.p>
          </>
        )}
      </Box>
    </>
  );
};
