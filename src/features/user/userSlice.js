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
  async (userId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${baseURL}/users`, { userId });
      if (data.success) {
        return fulfillWithValue({ user: data.user, viewer: data.viewer });
      }
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  "users/updateUserDetails",
  async (userData, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseURL}/users`, {
        fullName: userData.fullName,
        bio: userData.bio,
        profile_picture: userData.profile_picture,
        website: userData.website,
      });
      if (data.success) {
        return fulfillWithValue(data.user);
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
    [updateUserDetails.fulfilled]: (state, { payload }) => {
      state.users = state.users.map((user) =>
        user._id === payload._id ? payload : user
      );
      state.loading = false;
    },
    [updateUserDetails.rejected]: (state, action) => {
      console.error(action.payload);
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
      console.error(action.payload);
      state.loading = false;
    },
  },
});
export const { loadingUsers } = userSlice.actions;
export default userSlice.reducer;
