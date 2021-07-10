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
      {(user.loading || posts.loading) && <p>loading</p>}
      <PageRoutes />
    </>
  );
};
