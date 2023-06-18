import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/index";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  data: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createNewUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
      })
      .addCase(createNewUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.map((user) => {
          if (user._id === action.payload._id) {
            return action.payload;
          }
          return user;
        });
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const getAllUsers = createAsyncThunk(
  "userSlice/getAllUsers",
  async (selectedPage) => {
    try {
      const { url, method, headers } = api.getAllUsers(selectedPage);
      const users = await axios({
        url,
        method,
        headers,
      });
      return users.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const createNewUser = createAsyncThunk(
  "userSlice/createNewUser",
  async (newUser) => {
    try {
      const { url, method, headers, data } = api.createNewUser(newUser);
      const user = await axios({
        url,
        method,
        headers,
        data,
      });
      return user.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const updateUser = createAsyncThunk(
  "userSlice/updateUser",
  async ({ id, updateData }) => {
    try {
      const { url, method, headers, data } = api.updateUser(id, updateData);
      const user = await axios({
        url,
        method,
        headers,
        data,
      });
      return user.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const deleteUser = createAsyncThunk(
  "userSlice/deleteUser",
  async (id) => {
    try {
      const { url, method, headers } = api.deleteUser(id);
      await axios({
        url,
        method,
        headers,
      });
      return id;
    } catch (error) {
      return error.message;
    }
  }
);

export const { actions } = usersSlice;
export default usersSlice.reducer;
