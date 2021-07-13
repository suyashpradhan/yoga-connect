import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../config/index";

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async () => {
    const response = await axios.get(`${baseURL}/users/all`);
    return response.data;
  }
);

export const followButtonPressed = createAsyncThunk(
  "users/followButtonPressed",
  async (viewerId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${baseURL}/users`, { viewerId });
      if (data.success) {
        return fulfillWithValue({
          user: data.user,
          viewer: data.viewer,
        });
      }
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "",
    loading: false,
  },
  reducers: {
    loadingUsers: (state) => {
      state.loading = true;
    },
  },
  extraReducers: {
    [fetchAllUsers.pending]: (state) => {
      state.status = "loading";
    },
    [fetchAllUsers.fulfilled]: (state, action) => {
      state.users = action.payload.users;
      state.status = "fulfilled";
      state.loading = false;
    },
    [fetchAllUsers.rejected]: (state, action) => {
      state.status = "rejected";
      state.loading = false;
    },

    [followButtonPressed.fulfilled]: (state, { payload }) => {
      const userIndex = state.users.findIndex(
        (user) => user._id === payload.user._id
      );
      const viewerIndex = state.users.findIndex(
        (user) => user._id === payload.viewer._id
      );
      state.users[userIndex] = payload.user;
      state.users[viewerIndex] = payload.viewer;
      state.loading = false;
    },
    [followButtonPressed.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});
export const { loadingUsers } = userSlice.actions;
export default userSlice.reducer;
