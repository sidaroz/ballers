import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function Navbar() {
  const navigate = useNavigate();
  function profileClick() {
    const infoBox = document.querySelector(".user-info");
    infoBox.classList.toggle("hidden");
  }
  return (
    <>
      <div className="navbar-grid">
        <h1 className="logo">Ballers</h1>
        <div className="navbar-profile" onClick={profileClick}></div>
      </div>
      <div className="user-info hidden">
        <h3 className="top-info" onClick={() => navigate("/view-profile")}>
          View Profile
        </h3>
        <h3 className="bottom-info" onClick={() => navigate("/")}>
          Sign Out
        </h3>
      </div>
    </>
  );
}

export default Navbar;
