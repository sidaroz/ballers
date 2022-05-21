import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./styles.css";

function SingleSesh() {
  const { id } = useParams();

  const [data, setData] = useState({ posts: [] });

  useEffect(() => {
    axiosInstance.get(id).then((res) => {
      setData({ posts: res.data });
      console.log(res.data);
    });
  }, [setData]);

  if (data.posts.area === 1) {
    data.posts.area = "North London";
  } else if (data.posts.area === 2) {
    data.posts.area = "West London";
  } else if (data.posts.area === 3) {
    data.posts.area = "East London";
  } else if (data.posts.area === 4) {
    data.posts.area = "South London";
  }
  return (
    <>
      <Navbar />
      <div className={`game-info single-game ${data.posts.id}`}>
        <div>
          <h2 className="player-username">{data.posts.player}</h2>
          <h2 className="single-time">Time: {data.posts.time}</h2>
        </div>
        <h2 className="single-area">Area: {data.posts.area}</h2>
        <h2 className="single-difficulty">
          Difficulty: {data.posts.difficulty}
        </h2>
        <h2 className="single-players-needed">
          Players Needed: {data.posts.players_needed}
        </h2>
        <h2 className="single-description">
          Description: {data.posts.description}
        </h2>
        <button className={`join-game ${data.posts.id}`}>Join</button>
      </div>
    </>
  );
}

export default SingleSesh;
