import { PersonAdd, RadioButtonUnchecked, Search } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../features/appSlice";
import { resetCameraImg } from "../features/camSlice";

import { auth, db } from "../firebase";
import Chat from "./Chat";
import "./Chats.css";

function Chats() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: doc.data(),
          };
        })
      );
    });
  }, []);

  const takeSnap = () => {
    dispatch(resetCameraImg());
    navigate("/");
  };

  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar
          src={user?.profilePic}
          onClick={() => auth.signOut()}
          className="chats__avatar"
        />
        <div className="chats__search">
          <Search className="chats__searchIcon" />
          <input type="text" placeholder="Friends" />
        </div>
        <PersonAdd className="chats__chatIcon" />
      </div>

      <div className="chats__post">
        {posts.map(
          ({
            id,
            data: { profilePic, username, imageUrl, timeStamp, read },
          }) => (
            <Chat
              key={id}
              id={id}
              username={username}
              profilePic={profilePic}
              imageUrl={imageUrl}
              timeStamp={timeStamp}
              read={read}
            />
          )
        )}
      </div>

      <RadioButtonUnchecked
        className="chats_picIcon"
        onClick={takeSnap}
        fontSize="large"
      />
    </div>
  );
}

export default Chats;
