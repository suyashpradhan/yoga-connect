import { Heading } from "@chakra-ui/react";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import { PostDetails } from "../features";
import { Login, Register } from "../features/authentication";

import { UserProfile } from "../features/user/UserProfile";
import { Home } from "../pages/Home";
import { PrivateRoute } from "./PrivateRoutes";

export const PageRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <PrivateRoute path="home" element={<Home />}></PrivateRoute>
        <PrivateRoute path="/:userName" element={<UserProfile />} />
        {/*   <PrivateRoute path="/:userName/following" element={<Following />} />
        <PrivateRoute path="/:userName/followers" element={<Followers />} /> */}
        <PrivateRoute
          path="/:userName/post/:postId"
          element={<PostDetails />}
        />
        {/* <PrivateRoute path="/search" element={<SearchUsers />} /> */}
      </Routes>
    </>
  );
};
