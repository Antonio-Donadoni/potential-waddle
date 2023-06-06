import React from "react";

const Navbar = () => {
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
    </nav>
  );
};

export default Navbar;
