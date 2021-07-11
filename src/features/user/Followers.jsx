import { Image, Heading, Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { UserCard } from "../../components/UserCard";
import { Navbar } from "../../components/Navbar";

export const Followers = () => {
  const { userName } = useParams();

  const user = useSelector((state) => state.users.users).find(
    (user) => user.userName === userName
  );

  return (
    <Box minH={"100vh"} backgroundColor={"brand.primary"}>
      <Navbar />
      {user.followers.map((userId) => (
        <UserCard key={userId} userId={userId} />
      ))}
      {user.followers.length === 0 && (
        <>
          <Box maxW={"8xl"} mx={"auto"}>
            <Box
              minH={"40vh"}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
              flexDirection={"column"}
              my={"32"}
            >
              <Image
                src="https://yoga-trivia-assets.s3.ap-south-1.amazonaws.com/empty_state.svg"
                w={"auto"}
                height={"80"}
                mx={"auto"}
                display={"block"}
              ></Image>
              <Heading
                fontFamily={"default.heading"}
                fontSize={"xl"}
                color={"brand.white"}
                fontWeight={"400"}
                textAlign={"center"}
                my={"6"}
              >
                No one is following you. When they do, they’ll be listed here.
              </Heading>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};
