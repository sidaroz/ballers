import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function Register() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Register Now!</h1>
      <form className="form-grid">
        <input
          type="text"
          placeholder="Username"
          id="register-username"
          required
        ></input>
        <input
          type="email"
          placeholder="Email"
          id="register-email"
          required
        ></input>
        <input
          type="password"
          placeholder="Password"
          id="register-password"
          required
        ></input>
        <input type="password" placeholder="Verify password" required></input>
        <button type="submit">Register!</button>
      </form>
      <h2 className="return-home" onClick={() => navigate("/")}>
        Already have an account? Click Here to login.
      </h2>
    </>
  );
}

export default Register;
