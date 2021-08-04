import {
  Box,
  Avatar,
  Grid,
  Container,
  Heading,
  chakra,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { likeButtonPressed, fetchAllPosts } from "./postSlice";
import { Navbar } from "../../components/Navbar";

export const PostDetails = () => {
  const navigate = useNavigate();
  const { postId, userName } = useParams();
  const status = useSelector((state) => state.posts.status);
  const currentUser = useSelector((state) => state.auth.login);

  let postData = useSelector((state) => state.posts.posts).find(
    (post) => post._id === postId
  );
  const postDispatch = useDispatch();
  const user = useSelector((state) => state.users.users).find(
    (user) => user.userName === userName
  );

  return (
    status === "fulfilled" && (
      <Box fontFamily={"default.heading"}>
        <Navbar />
        <Box
          px={"4"}
          paddingBottom={"8"}
          paddingTop={"24"}
          fontFamily={"default.heading"}
          backgroundColor={"brand.primary"}
          minH={"100vh"}
        >
          <Grid maxW={"5xl"} mx={"auto"} templateColumns="1fr" gap={10}>
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
              <Box spacing={"12px"}>
                <Grid gridTemplateColumns={"1fr auto"}>
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
                  <Heading>
                    {/* {post.user === currentUser._id && (
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
                    )} */}
                  </Heading>

                  <chakra.p
                    color={"brand.white"}
                    my={"8"}
                    lineHeight={"1.6"}
                    textAlign={"justify"}
                  >
                    {postData.description}
                  </chakra.p>
                </Grid>
              </Box>

              <Box>
                {postData.likes.includes(currentUser._id) ? (
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
                          postId: postData._id,
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
                      postDispatch(likeButtonPressed({ postId: postData._id }));
                    }}
                  />
                )}
                <chakra.p
                  display={"inline"}
                  marginLeft={".4rem"}
                  color={"brand.offWhite"}
                >
                  {postData.likes.length}
                </chakra.p>
              </Box>
            </Container>
          </Grid>
        </Box>
      </Box>
    )
  );
};
