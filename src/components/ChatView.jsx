import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import { selectSelectedImage } from "../features/appSlice";
import "./ChatView.css";

function ChatView() {
  const selectedImage = useSelector(selectSelectedImage);

  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedImage) {
      exitChatView();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImage]);

  const exitChatView = () => {
    navigate("/chats");
  };

  console.log("selected", selectedImage);

  return (
    <div className="chatView">
      <img src={selectedImage} alt="" onClick={exitChatView} />
      <div className="chatView__timer">
        <CountdownCircleTimer
          isPlaying
          duration={10}
          strokeWidth={6}
          size={50}
          colors={[
            ["#004777", 0.33],
            ["#f7b801", 0.33],
            ["#a30000", 0.33],
          ]}
        >
          {({ remainingTime }) => {
            if (remainingTime === 0) {
              exitChatView();
            }

            return remainingTime;
          }}
        </CountdownCircleTimer>
      </div>
    </div>
  );
}

export default ChatView;
