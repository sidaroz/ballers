import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import axiosInstance from "../../axios";
import registerNowLogo from "../../images/register-now.png";
import registerNowBtnLogo from "../../images/register.png";

function Register() {
  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    username: "",
    email: "",
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
    console.log(formData);

    axiosInstance
      .post(`/user/register/`, {
        user_name: formData.username,
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        navigate("/");
        console.log(res);
      });
  };

  return (
    <main className="register-body">
      <img
        src={registerNowLogo}
        alt="register now"
        className="register-header"
      />
      <form className="form-grid">
        <input
          type="text"
          name="username"
          placeholder="Username *"
          id="register-username"
          required
          onChange={handleChange}
        ></input>
        <input
          type="email"
          name="email"
          placeholder="Email *"
          id="register-email"
          onChange={handleChange}
          required
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Password *"
          id="register-password"
          onChange={handleChange}
          required
        ></input>
        <img
          src={registerNowBtnLogo}
          alt="register button"
          onClick={handleSubmit}
          className="register-btn-registerpage"
        />
      </form>
      <h2 className="return-home" onClick={() => navigate("/")}>
        Already have an account? Click Here to login.
      </h2>
    </main>
  );
}

export default Register;
