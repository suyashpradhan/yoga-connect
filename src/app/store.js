import { configureStore } from "@reduxjs/toolkit";
import userAuthenticationReducer from "../features/authentication/authenticationSlice";
import userPostSliceReducer from "../features/posts/postSlice";
import userSliceReducer from "../features/user/userSlice";

export default configureStore({
  reducer: {
    posts: userPostSliceReducer,
    auth: userAuthenticationReducer,
    users: userSliceReducer,
  },
});
