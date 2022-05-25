import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./styles.css";

function SingleSesh() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({ posts: [] });
  const [originalId, setOriginalId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get(id).then((res) => {
      setData({ posts: res.data });
      setOriginalId(res.data.player.id);
      setLoading(false);
    });
  }, [setData]);

  const [userData, setUserData] = useState({
    username: "",
    properUsername: "",
  });
  useEffect(() => {
    axiosInstance.get("/user/username").then((res) => {
      setUserData({
        username: res.data[0].id,
        properUsername: res.data[0].user_name,
      });
    });
  }, [setUserData]);

  //JOIN FUNCTIONALITY
  const [clicked, setClicked] = useState(false);
  const joinHandlerFalse = (e) => {
    const joinBtn = document.querySelector(".single-join-btn ");
    joinBtn.textContent = "Unjoin";
    e.preventDefault();
    axiosInstance
      .put(`edit/${id}/`, {
        players_needed: (data.posts.players_needed -= 1),
        description: data.posts.description,
        area: data.posts.area,
        time: data.posts.time,
        player: originalId,
      })
      .then((res) => {
        axiosInstance.get(id).then((res) => {
          setClicked(true);
          console.log(clicked);
          setData({ posts: res.data });
        });
      });
  };
  const joinHandlerTrue = (e) => {
    const joinBtn = document.querySelector(".single-join-btn ");
    joinBtn.textContent = "Join";
    axiosInstance
      .put(`edit/${id}/`, {
        players_needed: (data.posts.players_needed += 1),
        description: data.posts.description,
        area: data.posts.area,
        time: data.posts.time,
        player: originalId,
      })
      .then((res) => {
        axiosInstance.get(id).then((res) => {
          setClicked(false);
          setData({ posts: res.data });
        });
      });
  };

  //DELETE FUNCTIONALITY
  const deleteHandler = (e) => {
    e.preventDefault();
    axiosInstance.delete(`delete/${id}/`).then(() => navigate("/home"));
  };
  if (!loading) {
    return (
      <>
        <Navbar />
        <div className={`single-game ${data.posts.id}`}>
          <div>
            <h2 className="player-username">{data.posts.player.username}</h2>
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
            <button
              className={`single-join-btn ${data.posts.id} ${
                userData.properUsername === data.posts.player.username
                  ? "hidden"
                  : ""
              }`}
              onClick={clicked ? joinHandlerTrue : joinHandlerFalse}
              disabled={
                data.posts.players_needed === 0 && clicked === false
                  ? true
                  : false
              }
            >
              Join
            </button>
            <button
              className={`single-chat-btn chat-${data.posts.id}`}
              onClick={() => navigate(`/session/chat/${data.posts.id}`)}
            >
              Chat
            </button>
            <button
              className={`single-delete-btn ${data.posts.id} ${
                userData.properUsername === data.posts.player.username
                  ? ""
                  : "hidden"
              }`}
              onClick={deleteHandler}
            >
              Delete Post
            </button>
          </div>
        </div>
      </>
    );
  }
  return <p>LOADING....</p>;
}

export default SingleSesh;
