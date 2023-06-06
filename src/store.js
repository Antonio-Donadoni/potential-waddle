// store.js

import { configureStore, createSlice } from "@reduxjs/toolkit";

const appuntamentiSlice = createSlice({
  name: "appuntamenti",
  initialState: [],
  reducers: {
    setAppuntamenti: (state, action) => {
      console.log("seertt", action.payload);
      return action.payload;
    },
    addAppuntamento: (state, action) => {
      const newState = [...state, action.payload];
      // ordina per data
      const orderedState = newState.sort((a, b) => {
        return new Date(a.data) - new Date(b.data);
      });
      return orderedState;
    },
    deleteAppuntamento: (state, action) => {
      return state.filter((appuntamento) => appuntamento.id !== action.payload);
    },
    toggleCompletato: (state, action) => {
      return state.map((appuntamento) => {
        if (appuntamento.id === action.payload) {
          return {
            ...appuntamento,
            completato: !appuntamento.completato,
          };
        }
        return appuntamento;
      });
    },
  },
});

export const {
  setAppuntamenti,
  addAppuntamento,
  deleteAppuntamento,
  toggleCompletato,
} = appuntamentiSlice.actions;

export default configureStore({
  reducer: {
    appuntamenti: appuntamentiSlice.reducer,
  },
});
