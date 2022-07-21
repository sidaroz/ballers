import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../axios";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import "./styles.css";
import makeSeshLogo from "../../images/addsesh-button.png";
import filterLogo from "../../images/filter-button.png";
import searchFilterLogo from "../../images/search-button.png";

function Filter() {
  const { area, difficulty } = useParams();
  const [data, setData] = useState({ posts: [] });
  const navigate = useNavigate();

  useEffect(() => {
    console.log(area, difficulty);
    axiosInstance.get(`search/?search=${area},${difficulty}`).then((res) => {
      setData({ posts: res.data });
      setNewArea("North");
      setNewDifficulty("Beginner");
      console.log(res.data);
    });
  }, [setData]);

  const [newArea, setNewArea] = useState("");
  const [newDifficulty, setNewDifficulty] = useState("");
  function filterSearch(e) {
    e.preventDefault();
    navigate(`/home/search/${newArea}/${newDifficulty}/`);
    axiosInstance
      .get(`search/?search=${newArea},${newDifficulty}`)
      .then((res) => {
        setData({ posts: res.data });
        console.log(res.data);
      });
  }
  function filterChange() {
    const areaFilter = document.querySelector(".area-filter");
    const difficultyFilter = document.querySelector(".difficulty-filter");
    const areaNeeded = areaFilter.value.split(" ")[0];
    setNewArea(areaNeeded);
    setNewDifficulty(difficultyFilter.value);
  }
  function filterHandler() {
    const filterGame = document.querySelector(".filter-grid");
    filterGame.classList.toggle("hidden");
  }

  if (data.posts.length === 0) {
    return (
      <>
        <Navbar />
        <div className="edit-grid">
          <img
            src={filterLogo}
            alt="filter logo"
            className="filter-logo"
            onClick={filterHandler}
          />
          <img
            src={makeSeshLogo}
            alt="session logo"
            className="session-logo"
            onClick={() => navigate("/create-session")}
          />
        </div>

        <div className="filter-grid hidden">
          <form>
            <div className="labels">
              <label htmlFor="Area">Area:</label>
              <select
                name="Area"
                placeholder="Area"
                className="area-filter"
                onChange={filterChange}
              >
                <option value="North London">North London</option>
                <option value="West London">West London</option>
                <option value="East London">East London</option>
                <option value="South London">South London</option>
              </select>
            </div>

            <div className="labels">
              <label htmlFor="Difficulty">Difficulty:</label>
              <select
                name="Difficulty"
                className="difficulty-filter"
                onChange={filterChange}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <img
              src={searchFilterLogo}
              alt="search-btn"
              className="search-filter-btn"
              onClick={filterSearch}
            />
          </form>
        </div>

        <h1>There were no sessions found!</h1>
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <div className="edit-grid">
          <img
            src={filterLogo}
            alt="filter logo"
            className="filter-logo"
            onClick={filterHandler}
          />
          <img
            src={makeSeshLogo}
            alt="session logo"
            className="session-logo"
            onClick={() => navigate("/create-session")}
          />
        </div>

        <div className="filter-grid hidden">
          <form>
            <div className="labels">
              <label htmlFor="Area">Area:</label>
              <select
                name="Area"
                placeholder="Area"
                className="area-filter"
                onChange={filterChange}
              >
                <option value="North London">North London</option>
                <option value="West London">West London</option>
                <option value="East London">East London</option>
                <option value="South London">South London</option>
              </select>
            </div>

            <div className="labels">
              <label htmlFor="Difficulty">Difficulty:</label>
              <select
                name="Difficulty"
                className="difficulty-filter"
                onChange={filterChange}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <img
              src={searchFilterLogo}
              alt="search-btn"
              className="search-filter-btn"
              onClick={filterSearch}
            />
          </form>
        </div>
        {data.posts.map((session, i) => {
          return (
            <Link to={`/session/${session.id}`} key={session.id}>
              <div
                className={`game-info ${i + 1} ${
                  session.players_needed === 0 ? "full-lobby" : ""
                }`}
              >
                <div>
                  <h2>{session.player.username}</h2>
                  <h2>
                    Time: <span className="bold">{session.time}</span>
                  </h2>
                </div>
                <h2>
                  Area: <span className="bold">{session.area}</span>
                </h2>
                <h2>
                  Difficulty: <span className="bold">{session.difficulty}</span>
                </h2>
                <h2>
                  Players Needed:{" "}
                  <span className="bold">{session.players_needed}</span>
                </h2>
              </div>
            </Link>
          );
        })}
      </>
    );
  }
}

export default Filter;
