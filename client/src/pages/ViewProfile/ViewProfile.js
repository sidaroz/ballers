import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import axiosInstance from "../../axios";
import "./styles.css";
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
        <img src={userData.image}></img>
      </div>
      <h1 className="profile-username">{userData.properUsername}</h1>
      <h2 className="bio-heading">Bio:</h2>
      <p className="current-bio">{userData.bio}</p>
      <div className="view-profile-btn-grid">
        <button onClick={() => navigate("/edit-profile")}>Edit Profile</button>
        <button
          className="view-profile-home-btn"
          onClick={() => navigate("/home")}
        >
          Home
        </button>
      </div>
    </>
  );
}

export default ViewProfile;
