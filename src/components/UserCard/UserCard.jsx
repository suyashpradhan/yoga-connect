import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { followButtonPressed } from "../../features/user/userSlice";
import { Avatar, Button, Heading, Grid, Box } from "@chakra-ui/react";

export const UserCard = ({ userId }) => {
  const userDispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.users).find(
    (user) => user._id === userId
  );

  const currentUser = useSelector((state) => state.auth.login);
  const buttonState =
    currentUser._id === userId
      ? ""
      : user.followers.includes(currentUser._id)
      ? "Following"
      : "Follow";

  return (
    <>
      <Box maxW={"8xl"} mx={"auto"} px={"4"}>
        <Grid
          gridTemplateColumns={"1fr auto"}
          my={"8"}
          borderBottom={"1px"}
          borderColor={"brand.ternary"}
          paddingBottom={"6"}
        >
          <Box>
            <Grid gridTemplateColumns={"3.5rem 1fr"} gap={"3"}>
              {user?.profile_picture ? (
                <Avatar
                  cursor={"pointer"}
                  size={"md"}
                  onClick={() => navigate(`/${user.userName}`)}
                />
              ) : (
                <Avatar
                  cursor={"pointer"}
                  name={`${user.fullName}`}
                  src="https://bit.ly/broken-link"
                  size={"md"}
                  marginRight={"2"}
                  onClick={() => navigate(`/${user.userName}`)}
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
                  cursor={"pointer"}
                  marginBottom={".1rem"}
                >
                  {user.fullName}
                </Heading>
                <Heading
                  fontFamily={"default.heading"}
                  color={"brand.offWhite"}
                  size="sm"
                  display={"inline"}
                  fontWeight={"500"}
                >
                  @ {user.userName}
                </Heading>
              </Box>
            </Grid>
          </Box>
          <Box>
            <Button
              fontFamily={"default.heading"}
              backgroundColor={
                buttonState === "Following"
                  ? "brand.button"
                  : buttonState === "Follow"
                  ? "brand.primary"
                  : " "
              }
              color={"brand.white"}
              variant={"solid"}
              border={"1px"}
              borderColor={"brand.button"}
              fontSize={"md"}
              display={
                buttonState === "Following"
                  ? "block"
                  : buttonState === "Follow"
                  ? "block"
                  : "none"
              }
              h={"10"}
              _hover={{
                border: "1px",
                borderColor: "brand.button",
                color: "brand.white",
                background: "brand.primary",
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              fontWeight={"500"}
              type="submit"
              marginLeft={"auto"}
              marginTop={"4"}
              onClick={() => userDispatch(followButtonPressed(user._id))}
            >
              {buttonState}
            </Button>
          </Box>
        </Grid>
      </Box>
    </>
  );
};
