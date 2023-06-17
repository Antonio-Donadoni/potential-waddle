import React, { useEffect } from "react";
import { getProfile } from "../features/accountSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HomeIcon, LogOutIcon, SettingsIcon } from "lucide-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state) => state.account.profile);
  const path = window.location.pathname;

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  useEffect(() => {
    if (authToken) {
    } else {
      navigate("/login");
    }
    // dispatch(getAllUsers());
  }, [authToken, dispatch]);

  return (
    <nav
      className="bg-blue-800 text-white flex justify-between px-4 py-3 items-center
    "
    >
      <h1
        className="text-2xl font-bold space-x-2 px-2 py-1 rounded-lg bg-white text-blue-800
      "
      >
        {" "}
        Appointment APP
      </h1>
      <div className="flex items-center space-x-2">
        Bertornato,
        <p className="font-semibold ml-2">
          {profile?.nome} {profile?.cognome}
        </p>
        <p className="font-semibold"></p>
        {profile?.ruolo === "admin" && path !== "/admin" && (
          <a
            href="/admin"
            className="bg-white text-blue-800 border-2 border-blue-800
           px-4 py-2 rounded-lg font-semibold cursor-pointer hover:bg-blue-800 hover:text-white hover:border-white"
          >
            <SettingsIcon className="inline-block mr-2" size={18} />
            Admin
          </a>
        )}
        {profile?.ruolo === "admin" && path === "/admin" && (
          <a
            href="/"
            className="bg-white text-blue-800 border-2 border-blue-800
           px-4 py-2 rounded-lg font-semibold cursor-pointer hover:bg-blue-800 hover:text-white hover:border-white"
          >
            <HomeIcon className="inline-block mr-2" size={18} />
            Home
          </a>
        )}
        <div
          onClick={() => {
            localStorage.removeItem("authToken");
            navigate("/login");
          }}
          className="bg-white text-blue-800 border-2 border-blue-800
           px-4 py-2 rounded-lg font-semibold cursor-pointer hover:bg-blue-800 hover:text-white hover:border-white"
        >
          <LogOutIcon className="inline-block mr-2" size={18} />
          Logout
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
