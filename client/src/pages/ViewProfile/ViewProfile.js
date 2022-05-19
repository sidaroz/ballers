import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./styles.css";
function ViewProfile() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="profile-image"></div>
      <h1>Show Username</h1>

      <p>User's Bio</p>
      <button onClick={() => navigate("/edit-profile")}>Edit Profile</button>

      <button>Home</button>
    </>
  );
}

export default ViewProfile;
