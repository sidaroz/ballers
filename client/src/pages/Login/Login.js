import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";
import "./styles.css";

function Home() {
  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    username: "",
    password: "",
  });

  const [formData, setFormData] = useState(initialFormData);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData.username);

    axiosInstance
      .post(`token/`, {
        user_name: formData.username,
        password: formData.password,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        navigate("/home");
      });
  };

  function loginHandler(e) {
    const form = document.querySelector(".login-form");
    const loginUsername = document.querySelector("#login-username");
    const loginPassword = document.querySelector("#login-password");
    if (loginUsername.value === "" && loginPassword.value === "") {
      form.classList.toggle("hidden");
    } else {
      handleSubmit(e);
    }
  }

  return (
    <>
      <h1 className="home-title">Ballers</h1>
      <form className="hidden login-form">
        <input
          type="text"
          placeholder="Username"
          onChange={handleChange}
          name="username"
          id="login-username"
        />
        <input
          type="password"
          onChange={handleChange}
          name="password"
          placeholder="Password"
          id="login-password"
        />
      </form>
      <div className="btn-grid">
        <button className="btn-login" onClick={loginHandler}>
          Login
        </button>
        <button className="btn-register" onClick={() => navigate("/register")}>
          {" "}
          Register
        </button>
      </div>
    </>
  );
}

export default Home;
