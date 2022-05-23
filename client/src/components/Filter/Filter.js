import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axios";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import "./styles.css";

function Filter() {
  const { area, difficulty } = useParams();
  const [data, setData] = useState({ posts: [] });

  useEffect(() => {
    console.log(area, difficulty);
    axiosInstance.get(`search/?search=${area},${difficulty}`).then((res) => {
      setData({ posts: res.data });
      console.log(res.data);
    });
  }, [setData]);

  return (
    <>
      <Navbar />
      {data.posts.map((session, i) => {
        return (
          <Link to={`/session/${session.id}`}>
            <div className={`game-info ${i + 1}`}>
              <div>
                <h2>{session.player}</h2>
                <h2>Time: {session.time}</h2>
              </div>
              <h2>Area: {session.area}</h2>
              <h2>Difficulty: {session.difficulty}</h2>
              <h2>Players Needed: {session.players_needed}</h2>
              <button className={`join-game ${i + 1}`}>Join</button>
            </div>
          </Link>
        );
      })}
    </>
  );
}

export default Filter;
