import React, { useEffect } from "react";
import "./App.css";
import WebCamCapture from "./components/WebCamCapture";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { login, logout, selectUser } from "./features/appSlice";
import Preview from "./components/Preview";
import Chats from "./components/Chats";
import ChatView from "./components/ChatView";
import Login from "./components/Login";
import { auth } from "./firebase";

function App() {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.user.displayName,
            profilePic: authUser.user.photoURL,
            id: authUser.user.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <img src="./snapLogo.png" className="app__logo" alt="logo" />
            <div className="app__body">
              <div className="app__bodyBack">
                <Routes>
                  <Route exact path="/" element={<WebCamCapture />} />
                  <Route path="/preview" element={<Preview />} />
                  <Route path="/chats" element={<Chats />} />
                  <Route path="/chats/view" element={<ChatView />} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
