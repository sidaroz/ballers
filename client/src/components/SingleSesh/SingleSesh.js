import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./styles.css";
import chatLogo from "../../images/chat.png";
import joinLogo from "../../images/join-button.png";
import unJoinLogo from "../../images/unjoin-button.png";
import deletePostLogo from "../../images/delete-post.png";
import sessionDetailsLogo from "../../images/session-details.png";

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
    const joinBtn = document.querySelector(".single-join-btn");
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
    const joinBtn = document.querySelector(".single-join-btn");
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
        <img
          src={sessionDetailsLogo}
          alt="session details"
          className="session-details"
        />
        <div className={`single-game ${data.posts.id}`}>
          <div>
            <h2 className="player-username">{`${data.posts.player.username}'s session`}</h2>
            <h2 className="single-time">Time: <p className="highlight">{data.posts.time}</p></h2>
          </div>
          <h2 className="single-area">Area: <p className="highlight">{data.posts.area}</p></h2>
          <h2 className="single-difficulty">
            Difficulty: <p className="highlight">{data.posts.difficulty}</p>
          </h2>
          <h2 className="single-players-needed">
            Players Needed: <p className="highlight">{data.posts.players_needed}</p>
          </h2>
          <h2 className="single-description">
            Description: <p className="highlight">{data.posts.description}</p>
          </h2>
          <div className="button-grid">
            <img
              src={clicked ? unJoinLogo : joinLogo}
              onClick={
                data.posts.players_needed === 0 && !clicked
                  ? null
                  : data.posts.players_needed === 0 && clicked
                  ? joinHandlerTrue
                  : clicked
                  ? joinHandlerTrue
                  : joinHandlerFalse
              }
              id="join-btn"
              className={`single-join-btn ${data.posts.id} ${
                userData.properUsername === data.posts.player.username
                  ? "hidden"
                  : ""
              } ${
                data.posts.players_needed === 0 && clicked
                  ? null
                  : data.posts.players_needed === 0
                  ? "full-session"
                  : ""
              }`}
              alt="join or unjoin logo"
            />
            <img
              src={chatLogo}
              alt="chat logo"
              onClick={() => navigate(`/session/chat/${data.posts.id}`)}
              className="chat-logo-btn"
            />
            <img
              src={deletePostLogo}
              alt="delete post"
              className={`single-delete-btn ${data.posts.id} ${
                userData.properUsername === data.posts.player.username
                  ? ""
                  : "hidden"
              }`}
              onClick={deleteHandler}
            />
          </div>
        </div>
      </>
    );
  }
  return <p>LOADING....</p>;
}

export default SingleSesh;
