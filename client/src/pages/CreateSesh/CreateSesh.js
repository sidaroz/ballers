import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./styles.css";

function CreateSesh() {
  return (
    <>
      <Navbar />
      <h1>Create a Sesh!</h1>
      <div className="whole-form">
        <form className="create-session-form">
          <div className="labels">
            <label for="Area">Area:</label>
            <select name="Area" placeholder="Area">
              <option value="North London">North London</option>
              <option value="West London">West London</option>
              <option value="East London">East London</option>
              <option value="South London">South London</option>
            </select>
          </div>

          <div className="labels">
            <label for="Difficulty">Difficulty:</label>
            <select name="Difficulty">
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="info-grid">
            <div className="labels">
              <label for="time">Time of the session:</label>
              <input type="text" name="time" className="time-input" />
            </div>
            <div className="labels">
              <label for="players">Players Needed:</label>
              <input type="number" className="players-input" name="players" />
            </div>
            <div className="labels">
              <label for="description">Brief description of session:</label>
              <textarea name="description" rows="4" cols="40" />
            </div>
          </div>
          <button className="session-btn">Create Session</button>
        </form>
      </div>
    </>
  );
}

export default CreateSesh;
