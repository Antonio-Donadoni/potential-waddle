import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/index";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  data: [],
};
const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllAppointments.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewAppointment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createNewAppointment.fulfilled, (state, action) => {
        const newState = [...state.data, action.payload];
        //        ordina per data
        const orderedState = newState.sort((a, b) => {
          return new Date(a.data) - new Date(b.data);
        });
        state.loading = false;
        state.data = orderedState;
      })
      .addCase(createNewAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAppointment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.map((appuntamento) => {
          if (appuntamento._id === action.payload._id) {
            return action.payload;
          }
          return appuntamento;
        });
      })
      .addCase(updateAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteAppointment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(
          (appuntamento) => appuntamento._id !== action.payload._id
        );
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const getAllAppointments = createAsyncThunk(
  "appointmentsSlice/getAllAppointments",
  async () => {
    try {
      console.log("getAllAppointments");
      const { url, method, headers } = api.getAllAppointments();
      const appointments = await axios({
        url,
        method,
        headers,
      });
      return appointments.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const createNewAppointment = createAsyncThunk(
  "appointmentsSlice/createNewAppointment",
  async (newAppointment) => {
    try {
      const { url, method, headers, data } =
        api.createNewAppointment(newAppointment);
      const appointments = await axios({
        url,
        method,
        headers,
        data,
      });
      return appointments.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const updateAppointment = createAsyncThunk(
  "appointmentsSlice/updateAppointment",
  async ({ id, updateData }) => {
    try {
      console.log("updateAppointment" + id + updateData);
      const { url, method, headers, data } = api.updateAppointment(
        id,
        updateData
      );
      const appointments = await axios({
        url,
        method,
        headers,
        data,
      });
      return appointments.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const deleteAppointment = createAsyncThunk(
  "appointmentsSlice/deleteAppointment",
  async (id) => {
    try {
      const { url, method, headers } = api.deleteAppointment(id);
      const appointments = await axios({
        url,
        method,
        headers,
      });
      return appointments.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const { actions } = appointmentsSlice;

export default appointmentsSlice.reducer;
