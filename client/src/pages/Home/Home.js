import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./styles.css";
import makeSeshLogo from "../../images/addsesh-button.png";
import filterLogo from "../../images/filter-button.png";
import searchFilterLogo from "../../images/search-button.png";

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
      <main className="lighter-bg">
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
              alt="search button"
              className="search-filter-btn"
              onClick={filterSearch}
            />
          </form>
        </div>

        {/* <div className="game-info">
          <div>
            <h2>Username</h2>
            <h2>Time: 5:00pm</h2>
          </div>
          <h2>Area: North London</h2>
          <h2>Difficulty: Beginner</h2>
          <h2>Players Needed: 1</h2>
          <button className="join-game">Join</button>
        </div> */}
        {sessions.map((session, i) => {
          return (
            <Link to={`/session/${session.id}`} key={session.id}>
              <div
                className={`game-info ${session.id} ${
                  session.players_needed === 0 ? "full-lobby" : ""
                }`}
              >
                <div>
                  <h2>{session.player.username}</h2>
                  <h2>
                    Time: <p className="bold">{session.time}</p>
                  </h2>
                </div>
                <h2>
                  Area: <p className="bold">{session.area}</p>
                </h2>
                <h2>
                  Difficulty: <p className="bold">{session.difficulty}</p>
                </h2>
                <h2>
                  Players Needed:
                  <p className="bold"> {session.players_needed}</p>
                </h2>
              </div>
            </Link>
          );
        })}
      </main>
    );
  }
  return <p>LOADING....</p>;
}

export default Home;
