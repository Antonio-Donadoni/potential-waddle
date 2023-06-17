import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/index";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  data: null,
  profile: null,
};
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    logout: (state) => {
      state.profile = null;
      state.data = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        console.log("error", action.error.message);
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getProfile.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        console.log("error", action.error.message);
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const login = createAsyncThunk(
  "accountSlice/login",
  async (credentials) => {
    const { url, method, headers, data } = api.login(credentials);
    const account = await axios({
      url,
      method,
      headers,
      data,
    });
    if (account) {
      localStorage.setItem("authToken", account.data.token);
    }
    return account.data;
  }
);
export const getProfile = createAsyncThunk(
  "accountSlice/getProfile",
  async () => {
    const { url, method, headers } = api.getProfile();
    const profile = await axios({
      url,
      method,
      headers,
    });
    return profile.data;
  }
);

export const { logout } = accountSlice.actions;
export const { actions } = accountSlice;
export default accountSlice.reducer;
