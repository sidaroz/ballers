import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./styles.css";
import axiosInstance from "../../axios";
import { Navigate, useNavigate } from "react-router-dom";
import createSessionLogo from "../../images/create-a-session.png";
import createSessionBtnLogo from "../../images/create.png";

function CreateSesh() {
  const navigate = useNavigate();
  //FOR CREATING A SESSION
  const [area, setArea] = useState("North London");
  const [difficulty, setDifficulty] = useState("Beginner");
  const initialFormData = Object.freeze({
    player: "",
    area: area,
    difficulty: difficulty,
    time: "",
    players_needed: "",
    description: "",
  });

  const [formData, setFormData] = useState(initialFormData);
  const [userData, setUserData] = useState({ username: "" });
  useEffect(() => {
    axiosInstance.get("/user/username").then((res) => {
      setUserData({ username: res.data[0].id });
      setFormData({
        ...formData,
        player: res.data[0].id,
      });
    });
  }, [setUserData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post("create/", {
        area: formData.area,
        difficulty: formData.difficulty,
        time: formData.time,
        players_needed: formData.players_needed,
        description: formData.description,
        player: formData.player,
      })
      .then((res) => {
        navigate("/home/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <img
        src={createSessionLogo}
        alt="create session"
        className="session-header"
      />
      <div className="whole-form">
        <form className="create-session-form">
          <div className="labels">
            <label htmlFor="Area">Area:</label>
            <select
              name="area"
              placeholder="Area"
              onChange={handleChange}
              className="create-area"
            >
              <option value="North London">North London</option>
              <option value="West London">West London</option>
              <option value="East London">East London</option>
              <option value="South London">South London</option>
            </select>
          </div>

          <div className="labels">
            <label htmlFor="Difficulty">Difficulty:</label>
            <select name="difficulty" onChange={handleChange} className="create-difficulty">
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="info-grid">
            <div className="labels">
              <label htmlFor="time">Time of the session:</label>
              <input
                type="text"
                name="time"
                className="time-input"
                onChange={handleChange}
              />
            </div>
            <div className="labels">
              <label htmlFor="players">Players Needed:</label>
              <input
                type="number"
                className="players-input"
                name="players_needed"
                onChange={handleChange}
              />
            </div>
            <div className="labels">
              <label htmlFor="description">Brief description of session:</label>
              <textarea
                name="description"
                rows="4"
                cols="40"
                onChange={handleChange}
                className="create-description"
              />
            </div>
          </div>
          <img
            src={createSessionBtnLogo}
            onClick={handleSubmit}
            alt="create session button"
            className="create-session-btn"
          />
        </form>
      </div>
    </>
  );
}

export default CreateSesh;
