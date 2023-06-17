// store.js

import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./features/usersSlice";
import appointmentsReducer from "./features/appointmentsSlice";
import accountSlice from "./features/accountSlice";

export const store = configureStore({
  reducer: {
    appuntamenti: appointmentsReducer,
    users: usersReducer,
    account: accountSlice,
  },
});
