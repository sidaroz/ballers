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

  return (
    <>
      <Navbar />
      <div className={`single-game ${data.posts.id}`}>
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
        <div className="button-grid">
          <button className={`single-join-btn ${data.posts.id}`}>Join</button>
          <button className={`single-chat-btn chat-${data.posts.id}`}>
            Chat
          </button>
        </div>
      </div>
    </>
  );
}

export default SingleSesh;
