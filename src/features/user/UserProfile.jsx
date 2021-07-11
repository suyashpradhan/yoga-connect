import {
  Heading,
  Avatar,
  Box,
  Flex,
  Text,
  Stack,
  Button,
  Divider,
  chakra,
  Icon,
} from "@chakra-ui/react";

import { CgWebsite } from "react-icons/cg";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { AllPosts } from "../posts/AllPosts";
import { Navbar } from "../../components/Navbar";

export const UserProfile = () => {
  const { userName } = useParams();

  const user = useSelector((state) => state.users.users).find(
    (user) => user.userName === userName
  );
  const currentUser = useSelector((state) => state.auth.login);

  let userPosts = useSelector((state) => state.posts.posts).filter(
    (post) => post.userId === user._id
  );

  return (
    <Box fontFamily={"default.headline"} backgroundColor={"brand.primary"}>
      <Navbar />
      <Box py={6} fontFamily={"default.heading"} maxW={"8xl"} mx={"auto"}>
        <Box
          maxW={"sm"}
          w={"full"}
          mx={"auto"}
          bg={"brand.primary"}
          boxShadow={"lg"}
          rounded={"md"}
          overflow={"hidden"}
          border={"1px"}
          borderColor={"brand.ternary"}
          p={"2"}
          marginBottom={"8"}
        >
          <Flex justify={"center"} mt={4}>
            {user.profile_picture ? (
              <Avatar
                src={user.profile_picture}
                size={"xl"}
                alt={"user"}
                border={"1px"}
                borderColor={"brand.ternary"}
              />
            ) : (
              <Avatar
                size={"xl"}
                alt={"user"}
                border={"1px"}
                name={`${user.fullName}`}
                src="https://bit.ly/broken-link"
                borderColor={"brand.ternary"}
              />
            )}
          </Flex>

          <Box p={6}>
            <Stack spacing={0} align={"center"} mb={5}>
              <Heading
                fontSize={"2xl"}
                fontWeight={500}
                fontFamily={"default.heading"}
                color={"brand.white"}
              >
                {user.fullName}
              </Heading>
              <Text color={"brand.offWhite"}>@{userName}</Text>
            </Stack>

            <Stack
              direction={"row"}
              justify={"center"}
              spacing={12}
              marginBottom={"6"}
              marginTop={"6"}
            >
              <Stack spacing={0} align={"center"}>
                <Text fontWeight={600} color={"brand.white"}>
                  {userPosts.length}
                </Text>
                <Text fontSize={"sm"} color={"brand.offWhite"}>
                  Posts
                </Text>
              </Stack>

              <Stack spacing={0} align={"center"}>
                <Text fontWeight={600} color={"brand.white"}>
                  <Link to={`/${userName}/following`}>
                    {user.following.length}
                  </Link>
                </Text>
                <Text fontSize={"sm"} color={"brand.offWhite"}>
                  Followers
                </Text>
              </Stack>
              <Stack spacing={0} align={"center"}>
                <Text fontWeight={600} color={"brand.white"}>
                  <Link to={`/${userName}/followers`}>
                    {user.followers.length}
                  </Link>
                </Text>
                <Text fontSize={"sm"} color={"brand.offWhite"}>
                  Followers
                </Text>
              </Stack>
            </Stack>

            <Box>
              <chakra.p
                color={"brand.offWhite"}
                marginBottom={"4"}
                textAlign={"justify"}
                lineHeight={"1.6"}
              >
                {user.bio}
              </chakra.p>
            </Box>

            <Box>
              {user.website && (
                <Flex alignItems="center" mt={4} color={"brand.offWhite"}>
                  <Icon as={CgWebsite} h={6} w={6} mr={2} />

                  <chakra.h1 px={1} fontSize="sm" color={"brand.offWhite"}>
                    {user.link}
                  </chakra.h1>
                </Flex>
              )}
            </Box>

            <Divider color={"brand.ternary"} />

            <Button
              w={"full"}
              mt={8}
              bg={"brand.button"}
              color={"white"}
              /* onClick={buttonClicked} */
              rounded={"sm"}
              _hover={{
                boxShadow: "lg",
              }}
            >
              Edit Profile
            </Button>
          </Box>
        </Box>
        {userPosts.length === 0 && user._id === currentUser._id ? (
          <Heading>
            No posts to view
            <Link to="/home">Add a new post</Link>
          </Heading>
        ) : (
          <>
            <AllPosts userPosts={userPosts} />
          </>
        )}
      </Box>
    </Box>
  );
};
