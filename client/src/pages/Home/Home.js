import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./styles.css";

function Home() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    async function fetchSessions() {
      setLoading(true);
      const URL = "http://127.0.0.1:8000/api/";
      const data = await fetch(URL);
      const resp = await data.json();
      setSessions(resp);
      setLoading(false);
      setArea("North");
      setDifficulty("Beginner");
    }
    fetchSessions();
  }, [setSessions]);

  //FOR FILTER
  const [area, setArea] = useState("");
  const [difficulty, setDifficulty] = useState("");

  function filterSearch(e) {
    e.preventDefault();
    navigate(`search/${area}/${difficulty}`);
  }
  function filterChange() {
    const areaFilter = document.querySelector(".area-filter");
    const difficultyFilter = document.querySelector(".difficulty-filter");
    const areaNeeded = areaFilter.value.split(" ")[0];
    setArea(areaNeeded);
    setDifficulty(difficultyFilter.value);
  }
  function filterHandler() {
    const filterGame = document.querySelector(".filter-grid");
    filterGame.classList.toggle("hidden");
  }

  const navigate = useNavigate();
  if (!loading) {
    return (
      <>
        <Navbar />
        <div className="edit-grid">
          <h2 onClick={filterHandler}>Filter</h2>
          <button onClick={() => navigate("/create-session")}>
            + Make Sesh
          </button>
        </div>

        <div className="filter-grid hidden">
          <form>
            <div className="labels">
              <label for="Area">Area:</label>
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
              <label for="Difficulty">Difficulty:</label>
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
            <button className="search-btn" onClick={filterSearch}>
              Search
            </button>
          </form>
        </div>

        <div className="game-info">
          <div>
            <h2>Username</h2>
            <h2>Time: 5:00pm</h2>
          </div>
          <h2>Area: North London</h2>
          <h2>Difficulty: Beginner</h2>
          <h2>Players Needed: 1</h2>
          <button className="join-game">Join</button>
        </div>
        {sessions.map((session, i) => {
          return (
            <Link to={`/session/${session.id}`}>
              <div className={`game-info ${session.id}`}>
                <div>
                  <h2>{session.player.username}</h2>
                  <h2>Time: {session.time}</h2>
                </div>
                <h2>Area: {session.area}</h2>
                <h2>Difficulty: {session.difficulty}</h2>
                <h2>Players Needed: {session.players_needed}</h2>
              </div>
            </Link>
          );
        })}
      </>
    );
  }
  return <p>LOADING....</p>;
}

export default Home;
