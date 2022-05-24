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
      <h1>{userData.properUsername}</h1>

      <p>{userData.bio}</p>
      <button onClick={() => navigate("/edit-profile")}>Edit Profile</button>

      <button>Home</button>
    </>
  );
}

export default ViewProfile;
