import React from "react";
import "./Navbar.css";
import navLogo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={navLogo} alt="" />
      <h1>- Панель керування магазином</h1>
    </div>
  );
};

export default Navbar;
