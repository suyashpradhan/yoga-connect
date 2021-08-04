import { Spinner } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts, loadPosts } from "./features/posts/postSlice";
import { fetchAllUsers, loadingUsers } from "./features/user/userSlice";
import { PageRoutes } from "./routing";

export const App = () => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.auth);
  const currentUser = login.login;
  const user = useSelector((state) => state.users);
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    if (currentUser) {
      axios.defaults.headers.common["Authorization"] = currentUser.token;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser.token) {
      dispatch(fetchAllPosts());
      dispatch(loadPosts());
      dispatch(loadingUsers());
      dispatch(fetchAllUsers());
    }
  }, [currentUser]);

  return (
    <>
      {(user.loading || posts.loading) && (
        <div style={{ position: "relative", top: "50%" }}>
          <Spinner
            thickness="4px"
            speed="0.6s"
            emptyColor="gray.200"
            color="brand.500"
            size="xl"
          />
        </div>
      )}
      <PageRoutes />
    </>
  );
};
