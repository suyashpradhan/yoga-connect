import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { loginURL, registerURL } from "../../config";
import jwt_decode from "jwt-decode";

export const login = createAsyncThunk(
  "userAuthentication/login",
  async ({ userName, password }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${loginURL}`, {
        userName,
        password,
      });
      if (data.success) {
        return fulfillWithValue(data);
      }
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const register = createAsyncThunk(
  "userAuthentication/register",
  async (
    { userName, password, fullName, email },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(`${registerURL}`, {
        userName,
        password,
        fullName,
        email,
      });
      if (data.success) {
        return fulfillWithValue(data.success);
      }
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const userAuthenticationSlice = createSlice({
  name: "userAuthentication",
  initialState: {
    login: JSON.parse(localStorage.getItem("login")) || {
      token: "",
      _id: "",
      userName: "",
    },
    error: "",
    status: "",
    loading: false,
  },
  reducers: {
    logoutButtonPressed: (state) => {
      state.login = { token: "", _id: "", userName: "" };
      localStorage.clear();
    },

    startLoadingAuth: (state) => {
      state.loading = true;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.status = true;
    },
    [login.fulfilled]: (state, action) => {
      const token = action.payload.token;
      const decodedValue = jwt_decode(token);
      const login = {
        token: `Bearer ${token}`,
        userName: decodedValue.userName,
        _id: decodedValue._id,
        fullName: decodedValue.fullName,
      };
      localStorage.setItem("login", JSON.stringify(login));
      state.login = login;
      state.status = "fulfilled";
      state.loading = false;
    },
    [login.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "rejected";
      state.loading = false;
    },
    [register.fulfilled]: (state, action) => {
      state.signup = action.payload;
      state.error = "";
      state.loading = false;
    },
    [register.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "rejected";
      state.loading = false;
    },
  },
});

export const { logoutButtonPressed, startLoadingAuth } =
  userAuthenticationSlice.actions;
export default userAuthenticationSlice.reducer;
