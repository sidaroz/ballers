import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import axiosInstance from "../../axios";
import "./styles.css";
import homeLogo from "../../images/home-button.png";
import editProfileLogo from "../../images/edit-profile.png";

function ViewProfile() {
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
  }, [setUserData]);
  return (
    <>
      <Navbar />
      <div className="profile-image">
        <img src={userData.image} alt="user profile"></img>
      </div>
      <h1 className="profile-username">{userData.properUsername}</h1>
      <h2 className="bio-heading">Bio:</h2>
      <p className="current-bio">{userData.bio}</p>
      <div className="view-profile-btn-grid">
        <img
          src={editProfileLogo}
          alt="edit profile"
          onClick={() => navigate("/edit-profile")}
          className="view-profile-home-btn"
        />
        <img
          src={homeLogo}
          alt="home button"
          className="view-profile-home-btn"
          onClick={() => navigate("/home")}
        />
      </div>
    </>
  );
}

export default ViewProfile;
