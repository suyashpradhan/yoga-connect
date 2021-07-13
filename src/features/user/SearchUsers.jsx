import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Search } from "../../components/Search";
import { UserCard } from "../../components/UserCard";
import { Box, Image, Heading } from "@chakra-ui/react";

export const SearchUsers = () => {
  let users = useSelector((state) => state.users.users);
  const query = new URLSearchParams(useLocation().search);
  const searchValue = query.get("user");
  users = searchValue
    ? users.filter(
        (user) =>
          user.fullName.includes(searchValue) ||
          user.userName.includes(searchValue)
      )
    : users;
  return (
    <Box minH={"100vh"} backgroundColor={"brand.primary"}>
      <Search />
      {users.length > 0 ? (
        users.map(({ _id }) => <UserCard key={_id} userId={_id} />)
      ) : (
        <Box
          minH={"40vh"}
          display={"flex"}
          justifyContent={"center"}
          alignContent={"center"}
          flexDirection={"column"}
          my={"32"}
        >
          <Image
            src="https://yoga-trivia-assets.s3.ap-south-1.amazonaws.com/404.svg"
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
            No Users Found, Try Searching Again.
          </Heading>
        </Box>
      )}
    </Box>
  );
};
