import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";
import "./styles.css";
import logo from "../../images/nav-logo-small.png";
import viewProfileLogo from "../../images/view-profile.png";
import signOutLogo from "../../images/sign-out.png";

function Navbar() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    properUsername: "",
  });
  useEffect(() => {
    axiosInstance.get("/user/username").then((res) => {
      setUserData({
        username: res.data[0].id,
        properUsername: res.data[0].user_name,
        bio: res.data[0].bio,
        image: res.data[0].image,
      });
    });
  }, []);

  const logOutHandler = () => {
    const response = axiosInstance.post("user/logout/blacklist/", {
      refresh_token: localStorage.getItem("refresh_token"),
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    axiosInstance.defaults.headers["Authorization"] = null;
    navigate("/");
  };
  function profileClick() {
    const infoBox = document.querySelector(".user-info");
    infoBox.classList.toggle("hidden");
  }
  return (
    <>
      <div className="navbar-grid">
        <img
          src={logo}
          alt="players logo"
          className="logo"
          onClick={() => navigate("/home")}
        />
        <div className="navbar-profile" onClick={profileClick}>
          <img src={userData.image} alt="user profile"></img>
        </div>
      </div>
      <div className="user-info hidden">
        <img
          src={viewProfileLogo}
          alt="view profile"
          onClick={() => navigate("/view-profile")}
          className="top-info"
        />
        <img
          src={signOutLogo}
          alt="sign out"
          onClick={logOutHandler}
          className="bottom-info"
        />
      </div>
    </>
  );
}

export default Navbar;
