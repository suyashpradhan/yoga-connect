import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { login } from "./authenticationSlice";

export const Login = () => {
  const [{ userName, password }, setInputs] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const user = auth.login;

  useEffect(() => {
    if (user.token) {
      navigate("/home");
    }
  }, [user.token]);

  const dispatch = useDispatch();
  const loginHandler = async (e) => {
    e.preventDefault();
    await dispatch(login({ userName, password }));
  };

  return (
    <>
      <Stack
        fontFamily={"default.heading"}
        backgroundColor={"brand.primary"}
        minH={"100vh"}
        direction={{ base: "column", md: "row" }}
      >
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Image
              alt={"logo"}
              objectFit={"contain"}
              height={"6rem"}
              marginRight={"auto"}
              src={
                "https://yoga-trivia-assets.s3.ap-south-1.amazonaws.com/Group+453.svg"
              }
            />
            <Heading color={"brand.white"} fontSize={"4xl"}>
              Yoga Connect
            </Heading>
            <FormControl
              paddingTop={"2"}
              color={"brand.offWhite"}
              id="userName"
            >
              <FormLabel>Username</FormLabel>
              <Input
                type="userName"
                value={userName}
                onChange={(e) => {
                  setInputs((input) => ({
                    ...input,
                    userName: e.target.value,
                  }));
                }}
              />
            </FormControl>
            <FormControl
              paddingTop={"2"}
              paddingBottom={"4"}
              color={"brand.offWhite"}
              id="password"
            >
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => {
                  setInputs((input) => ({
                    ...input,
                    password: e.target.value,
                  }));
                }}
              />
            </FormControl>
            <Button
              backgroundColor={"brand.button"}
              color={"brand.white"}
              variant={"solid"}
              fontSize={"xl"}
              h={"50px"}
              _hover={{
                border: "1px",
                borderColor: "brand.button",
                color: "brand.white",
                background: "brand.primary",
              }}
              onClick={loginHandler}
              fontWeight={"500"}
              type="submit"
            >
              Login
            </Button>

            <Heading
              fontFamily={"default.heading"}
              color={"brand.offWhite"}
              fontSize={"1xl"}
              fontWeight={"medium"}
              paddingTop={"1"}
            >
              Don't have an account? <Link to="/register">Register Here</Link>
            </Heading>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={"Login Image"}
            objectFit={"cover"}
            src={
              "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
            }
          />
        </Flex>
      </Stack>
    </>
  );
};
