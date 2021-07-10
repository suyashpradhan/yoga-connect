import React from "react";
import {
  Box,
  Avatar,
  Grid,
  Container,
  Heading,
  chakra,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  fetchAllPosts,
  deletePostButtonPressed,
  likeButtonPressed,
} from "./postSlice";
import { getPostedTime } from "../../utils/time";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export const Post = ({ post }) => {
  console.log({ post });
  const postDispatch = useDispatch();
  let user = useSelector((state) =>
    state.users.users.find((user) => user._id === post.userId)
  );
  console.log(post);
  const currentUser = useSelector((state) => state.auth.login);
  const navigate = useNavigate();
  const postedDate = getPostedTime(new Date(post.createdAt), new Date());
  return (
    <>
      {post.user === currentUser._id && (
        <i
          onClick={() => {
            postDispatch(fetchAllPosts());
            postDispatch(deletePostButtonPressed(post._id));
          }}
        ></i>
      )}
      <Box
        paddingBottom={"8"}
        fontFamily={"default.heading"}
        backgroundColor={"brand.primary"}
      >
        <Grid maxW={"8xl"} mx={"auto"} templateColumns="1fr 30rem" gap={10}>
          <Container
            maxW={"8xl"}
            mx={"auto"}
            boxShadow={"md"}
            borderColor={"brand.secondary"}
            backgroundColor={"brand.secondary"}
            border={"1px"}
            rounded={"md"}
            p={6}
            direction={"column"}
          >
            <Box
              spacing={"12px"}
              onClick={() => navigate(`/${user.userName}/post/${post._id}`)}
            >
              <Grid gridTemplateColumns={"1fr auto"}>
                <Box>
                  <Grid gridTemplateColumns={"3.5rem 1fr"} gap={"3"}>
                    {user?.profile_picture ? (
                      <Avatar
                        size={"md"}
                        onClick={() => navigate(`/${user.userName}`)}
                      />
                    ) : (
                      <Avatar size={"md"} marginRight={"2"} />
                    )}
                    <Box fontFamily={"default.heading"}>
                      <Heading
                        onClick={() => navigate(`/${user.userName}`)}
                        fontFamily={"default.heading"}
                        fontSize={"xl"}
                        color={"brand.white"}
                        fontWeight={"400"}
                        display={"block"}
                      >
                        {user.fullName}
                      </Heading>
                      <Heading
                        fontFamily={"default.heading"}
                        color={"brand.offWhite"}
                        as="h6"
                        size="sm"
                        paddingTop={".2rem"}
                        display={"inline"}
                        fontWeight={"500"}
                      >
                        @{user.userName} •
                        <chakra.p
                          marginTop={"1rem"}
                          color={"brand.offWhite"}
                          display={"inline"}
                          marginLeft={".4rem"}
                          fontSize={".9rem"}
                          fontWeight={"400"}
                        >
                          {postedDate} ago
                        </chakra.p>
                      </Heading>
                    </Box>
                  </Grid>
                </Box>
                <Heading>
                  {post.user === currentUser._id && (
                    <DeleteIcon
                      color={"brand.offWhite"}
                      fontSize={"1.5rem"}
                      cursor={"pointer"}
                      verticalAlign={"middle"}
                      onClick={() => {
                        postDispatch(fetchAllPosts());
                        postDispatch(deletePostButtonPressed(post._id));
                      }}
                    />
                  )}
                </Heading>

                <chakra.p
                  color={"brand.white"}
                  my={"8"}
                  lineHeight={"1.6"}
                  textAlign={"justify"}
                >
                  {post.description}
                </chakra.p>
              </Grid>
            </Box>

            <Box>
              {post.likes.includes(currentUser._id) ? (
                <AiFillHeart
                  style={{
                    fontSize: "1.2rem",
                    color: "#ff0000",
                    display: "inline",
                    verticalAlign: "text-bottom",
                    cursor: "pointer",
                  }}
                />
              ) : (
                <AiOutlineHeart
                  style={{
                    fontSize: "1.2rem",
                    color: "#9f9fa1",
                    display: "inline",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    postDispatch(fetchAllPosts());
                    postDispatch(likeButtonPressed({ postId: post._id }));
                  }}
                />
              )}
              <chakra.p
                display={"inline"}
                marginLeft={".4rem"}
                color={"brand.offWhite"}
              >
                {post.likes.length}
              </chakra.p>
            </Box>
          </Container>
        </Grid>
      </Box>
    </>
  );
};
