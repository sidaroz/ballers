import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function Home() {
  const navigate = useNavigate();

  function loginHandler() {
    const form = document.querySelector(".login-form");
    const loginUsername = document.querySelector("#login-username");
    const loginPassword = document.querySelector("#login-password");
    if (loginUsername.value === "" && loginPassword.value === "") {
      form.classList.toggle("hidden");
    } else {
      navigate("/Home");
    }
  }

  return (
    <>
      <h1 className="home-title">Ballers</h1>
      <form className="hidden login-form">
        <input type="text" placeholder="Username" id="login-username" />
        <input type="password" placeholder="Password" id="login-password" />
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
