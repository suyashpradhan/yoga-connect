import React from "react";
import {
  Box,
  Avatar,
  Grid,
  Container,
  Heading,
  chakra,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchAllPosts, likeButtonPressed } from "./postSlice";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export const Post = ({ post }) => {
  const toast = useToast();

  const postDispatch = useDispatch();
  let user = useSelector((state) =>
    state.users.users.find((user) => user._id === post.userId)
  );

  const currentUser = useSelector((state) => state.auth.login);
  const navigate = useNavigate();

  return (
    <>
      <Box
        paddingBottom={"8"}
        fontFamily={"default.heading"}
        backgroundColor={"brand.primary"}
      >
        <Box maxW={"8xl"} mx={"auto"} px={"4"}>
          <Container
            maxW={"6xl"}
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
              <Grid gridTemplateColumns={"1fr"}>
                <Box>
                  <Grid gridTemplateColumns={"3.5rem 1fr"} gap={"3"}>
                    {user?.profile_picture ? (
                      <Avatar
                        size={"md"}
                        onClick={() => navigate(`/${user.userName}`)}
                      />
                    ) : (
                      <Avatar
                        name={`${user.fullName}`}
                        src="https://bit.ly/broken-link"
                        size={"md"}
                        marginRight={"2"}
                      />
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
                        @{user.userName}
                      </Heading>
                    </Box>
                  </Grid>
                </Box>

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
                  onClick={() => {
                    postDispatch(fetchAllPosts());
                    postDispatch(
                      likeButtonPressed({
                        postId: post._id,
                      })
                    );
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
                    postDispatch(
                      likeButtonPressed({
                        postId: post._id,
                      })
                    );
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
        </Box>
      </Box>
    </>
  );
};
