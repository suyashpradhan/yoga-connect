import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { postsURL } from "../../config";

export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async () => {
    const response = await axios.get(`${postsURL}`);
    return response.data;
  }
);

export const likeButtonPressed = createAsyncThunk(
  "posts/likeButtonPressed",
  async ({ postId }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${postsURL}/${postId}/like`);
      if (data.success) {
        return fulfillWithValue(data.post);
      }
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const postButtonPressed = createAsyncThunk(
  "post/postButtonPressed",
  async ({ postData }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${postsURL}`, {
        description: postData,
      });
      if (data.success) {
        return fulfillWithValue(data.post);
      }
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const deletePostButtonPressed = createAsyncThunk(
  "post/deletePostButtonPressed",
  async (postId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${postsURL}`, {
        _id: postId,
      });
      if (data.success) {
        return fulfillWithValue(postId);
      }
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "",
    loading: false,
  },
  reducers: {
    loadPosts: (state) => {
      state.loading = true;
    },
  },
  extraReducers: {
    [fetchAllPosts.pending]: (state) => {
      state.status = "loading";
    },
    [fetchAllPosts.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
      state.status = "fulfilled";
      state.loading = false;
    },
    [fetchAllPosts.rejected]: (state, action) => {
      state.status = "rejected";
      state.loading = false;
    },
    [likeButtonPressed.fulfilled]: (state, { payload }) => {
      state.posts = state.posts.map((post) =>
        post._id === payload._id ? payload : post
      );
      state.loading = false;
    },
    [likeButtonPressed.rejected]: (state, action) => {
      state.loading = false;
    },
    [postButtonPressed.fulfilled]: (state, { payload }) => {
      state.posts = state.posts.concat(payload);
      state.loading = false;
    },
    [postButtonPressed.rejected]: (state, action) => {
      state.loading = false;
    },
    [deletePostButtonPressed.fulfilled]: (state, { payload }) => {
      state.posts = state.posts.filter((post) => post._id !== payload);
      state.loading = false;
    },
    [deletePostButtonPressed.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});
export const { loadPosts } = postSlice.actions;
export default postSlice.reducer;
