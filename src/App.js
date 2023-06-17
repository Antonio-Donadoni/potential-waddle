import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppointmentsPage from "./pages/AppointmentsPage";
import "./App.css";
import UserList from "./pages/UserList";
import Login from "./pages/LoginPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppointmentsPage />} />
        <Route path="*" element={<h1>404 - Not Found</h1>} />
        <Route path="/admin" element={<UserList />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
