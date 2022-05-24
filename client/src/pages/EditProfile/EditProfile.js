import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import axiosInstance from "../../axios";

function EditProfile() {
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

  const initialFormData = Object.freeze({
    bio: "",
  });
  const [postImage, setPostImage] = useState(null);
  const [postData, setPostData] = useState(initialFormData);
  const handleChange = (e) => {
    if ([e.target.name] == "image") {
      console.log(e.target.files);
      console.log(imageInput.files[0]);
      setPostImage({
        image: e.target.files,
      });
    } else {
      setPostData({
        ...postData,
        [e.target.name]: e.target.value.trim(),
      });
    }
  };

  const imageInput = document.querySelector("#image-input");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(imageInput.files.length);
    let formData = new FormData();
    formData.append("user_name", userData.properUsername);
    formData.append("bio", postData.bio);
    if (imageInput.files.length === 0) {
      axiosInstance
        .put(`user/username/${userData.username}/`, formData)
        .then(() => {
          navigate("/view-profile");
        });
    } else {
      formData.append("image", postImage.image[0]);
    }
    axiosInstance
      .put(`user/username/${userData.username}/`, formData)
      .then(() => {
        navigate("/view-profile");
      });
  };
  return (
    <>
      <Navbar />
      <div className="profile-image">
        <img src={userData.image}></img>
      </div>
      <input
        accept="image/*"
        id="post-image"
        name="image"
        type="file"
        id="image-input"
        onChange={handleChange}
      />
      <h1>{userData.properUsername}</h1>

      <textarea
        className="bio-edit"
        placeholder="Bio"
        name="bio"
        onChange={handleChange}
      ></textarea>
      <br></br>
      <button onClick={handleSubmit}>Save Edit</button>
    </>
  );
}

export default EditProfile;
