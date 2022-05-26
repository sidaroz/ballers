import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/analytics";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollectionData,
  usseCollectionData,
} from "react-firebase-hooks/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
import axiosInstance from "../../axios";
import { useParams, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import Navbar from "../Navbar/Navbar";
import "./Chatroom.css";
import backLogo from "../../images/back-button.png";

firebase.initializeApp({
  apiKey: "AIzaSyCtEZSG4nfLVQtIDAH9Gk69KgFTnGzrQRo",
  authDomain: "ballersproject-3db24.firebaseapp.com",
  projectId: "ballersproject-3db24",
  storageBucket: "ballersproject-3db24.appspot.com",
  messagingSenderId: "177445550633",
  appId: "1:177445550633:web:4ddee89ae79d647a723a38",
  measurementId: "G-97DQMTXNWV",
});

// const auth = firebase.auth();
// const firestore = firebase.firestore();
// const analytics = firebase.analytics();

//TODO: When going to this page pass sesh id and user id via params or query
function Chatroom() {
  const navigate = useNavigate();
  const db = firebase.firestore();
  const { id } = useParams();
  const reference = db.collection(`room-${id}`).orderBy("timeStamp", "asc");
  const reference2 = db.collection(`room-${id}`);
  const [userData, setUserData] = useState({
    username: "",
    properUsername: "",
  });

  useEffect(() => {
    axiosInstance.get("/user/username").then((res) => {
      setUserData({
        username: res.data[0].id,
        properUsername: res.data[0].user_name,
        bio: res.data[0].bio,
        image: res.data[0].image,
      });
    });
  }, []);

  const [message, setMessage] = useState("");
  const [listOfMessages, setListOfMessages] = useState([]);

  const handleMessageChange = (event) => {
    const newMessage = event.target.value;
    setMessage(newMessage);
  };

  const handleSendMessage = async () => {
    const curMessage = {
      messageId: nanoid(), //TODO: use any uuid generator (INSTALL NANOID!!!!!! and import)
      username: userData.properUsername,
      message: message,
      timeStamp: `${("0" + new Date().getHours()).slice(-2)}:${(
        "0" + new Date().getMinutes()
      ).slice(-2)}:${("0" + new Date().getSeconds()).slice(-2)}`,
      userId: userData.username,
      userImage: userData.image,
      id: "",
    };
    const res = await reference2.add(curMessage);
    const sendBtn = document.querySelector(".msg-input");
    sendBtn.value = "";

    //TODO: Add if message fails
  };

  useEffect(() => {
    //SETUP FIREBASE CONNECTION AND SIGN IN ANONYMOUSLY!!!!
    const auth = getAuth();
    signInAnonymously(auth).then(() => {
      // Signed in..
    });
    const latestList = [];
    const collectionListener = reference.onSnapshot((querySnapshot) => {
      querySnapshot.docChanges().forEach((change, i) => {
        if (change.type === "added") {
          const incomingData = change.doc.data();
          const newMessage = {
            messageId: incomingData.messageId,
            username: incomingData.username,
            message: incomingData.message,
            timeStamp: incomingData.timeStamp.slice(0, -3),
            userId: incomingData.userId,
            userImage: incomingData.userImage,
            id: i,
          };

          latestList.push(newMessage);
          setListOfMessages([...latestList]);
        }
      });
      return () => collectionListener();
      //  TODO: make sure newMessage variable looks something like this:
    });
  }, []);

  return (
    <>
      <Navbar />
      <img
        src={backLogo}
        alt="back button"
        className="back-btn-logo"
        onClick={() => navigate(-1)}
      />
      <div className="chat-box">
        <ul>
          {listOfMessages.map((item, i) =>
            item.username === userData.properUsername ? (
              <li key={item.messageId} className="right-side-chat">
                <div className="div-holder">
                  <p className="time-right">{item.timeStamp}</p>
                  <div className="navbar-profile chat-profile right-side-div">
                    <p className="username-chat-right">{`${item.username}`}</p>
                    <img src={item.userImage} alt="user profile"></img>
                  </div>
                </div>
                <p className="chat-para-left">{item.message}</p>
              </li>
            ) : (
              <li key={item.messageId} className="left-side-chat">
                <div className="div-holder-left">
                  <div className="navbar-profile chat-profile">
                    <img src={item.userImage} alt="user profile"></img>
                    <p className="username-chat">{`${item.username}`}</p>
                  </div>
                  <p className="time-left">{item.timeStamp}</p>
                </div>
                <p className="chat-para">{item.message}</p>
              </li>
            )
          )}
        </ul>
      </div>

      <div className="input-chat">
        <input
          className="msg-input"
          onChange={handleMessageChange}
          placeholder="Message..."
        />
        <button className="send-msg-btn" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </>
  );
}

export default Chatroom;
