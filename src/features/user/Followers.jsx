import { Image, Heading, Box, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { UserCard } from "../../components/UserCard";
import { Navbar } from "../../components/Navbar";
import { Link } from "react-router-dom";

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

              <Link to="/search">
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignContent={"center"}
                  flexDirection={"column"}
                >
                  <Button
                    backgroundColor={"brand.button"}
                    color={"brand.white"}
                    fontFamily={"default.heading"}
                    variant={"solid"}
                    border={"1px"}
                    borderColor={"brand.button"}
                    fontSize={"md"}
                    textAlign={"center"}
                    width={"fit-content"}
                    h={"10"}
                    _hover={{
                      border: "1px",
                      borderColor: "brand.button",
                      color: "brand.white",
                      background: "brand.primary",
                    }}
                    fontWeight={"500"}
                    type="submit"
                    mx={"auto"}
                  >
                    Follow Users
                  </Button>
                </Box>
              </Link>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};
