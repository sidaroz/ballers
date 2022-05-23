import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./styles.css";
import axiosInstance from "../../axios";
import { Navigate, useNavigate } from "react-router-dom";

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
      <h1>Create a Sesh!</h1>
      <div className="whole-form">
        <form className="create-session-form">
          <div className="labels">
            <label for="Area">Area:</label>
            <select name="area" placeholder="Area" onChange={handleChange}>
              <option value="North London">North London</option>
              <option value="West London">West London</option>
              <option value="East London">East London</option>
              <option value="South London">South London</option>
            </select>
          </div>

          <div className="labels">
            <label for="Difficulty">Difficulty:</label>
            <select name="difficulty" onChange={handleChange}>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="info-grid">
            <div className="labels">
              <label for="time">Time of the session:</label>
              <input
                type="text"
                name="time"
                className="time-input"
                onChange={handleChange}
              />
            </div>
            <div className="labels">
              <label for="players">Players Needed:</label>
              <input
                type="number"
                className="players-input"
                name="players_needed"
                onChange={handleChange}
              />
            </div>
            <div className="labels">
              <label for="description">Brief description of session:</label>
              <textarea
                name="description"
                rows="4"
                cols="40"
                onChange={handleChange}
              />
            </div>
          </div>
          <button className="session-btn" onClick={handleSubmit}>
            Create Session
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateSesh;
