import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./styles.css";
function EditProfile() {
  return (
    <>
      <Navbar />
      <div className="profile-image"></div>
      <button>Upload Image</button>
      <h1>Show Username</h1>

      <textarea className="bio-edit" placeholder="Bio"></textarea>
      <br></br>
      <button>Save Edit</button>
    </>
  );
}

export default EditProfile;
