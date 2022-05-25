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
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import Navbar from "../Navbar/Navbar";

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
  const db = firebase.firestore();
  const { id } = useParams();
  const reference = db.collection(`room-${id}`);
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
      timeStamp: "",
      userId: userData.username,
      userImage: userData.image,
    };
    const res = await reference.add(curMessage);

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
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("doc=", change.doc.data());
          const incomingData = change.doc.data();
          const newMessage = {
            messageId: incomingData.messageId,
            username: incomingData.username,
            message: incomingData.message,
            timeStamp: "",
            userId: incomingData.userId,
            userImage: incomingData.userImage,
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
      <div>
        <ul>
          {listOfMessages.map((item, i) => (
            <li key={item.messageId}>
              {`${item.username}: `}
              {item.message}
            </li>
          ))}
        </ul>

        <text>Hello world</text>
        <input onChange={handleMessageChange} />
        <button onClick={handleSendMessage}>SEND MESSAGE</button>
      </div>
    </>
  );
}

export default Chatroom;
