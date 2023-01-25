import { StopRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactTimeago from "react-timeago";
import { selectImage } from "../features/appSlice";
import { db } from "../firebase";

import "./Chat.css";

function Chat({ id, profilePic, username, imageUrl, timeStamp, read }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const chatOpen = () => {
    if (!read) {
      dispatch(selectImage(imageUrl));

      db.collection("posts").doc(id).set(
        {
          read: true,
        },
        { merge: true }
      );

      navigate("/chats/view");
    }
  };

  return (
    <div className="chat" onClick={chatOpen}>
      <Avatar className="chat__avatar" src={profilePic} />
      <div className="chat__info">
        <h4>{username}</h4>
        <p>
          Tap to view -{" "}
          <ReactTimeago date={new Date(timeStamp?.toDate()).toUTCString()} />
        </p>
      </div>
      {!read && <StopRounded className="chat__notRead" />}
    </div>
  );
}

export default Chat;
