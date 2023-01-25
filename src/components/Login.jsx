import React from "react";
import { Button } from "@mui/material";

import "./Login.css";
import { auth, provider } from "../firebase";
import { useDispatch } from "react-redux";
import { login } from "../features/appSlice";

function Login() {
  const dispatch = useDispatch();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => {
        dispatch(
          login({
            username: res.user.displayName,
            profilePic: res.user.photoURL,
            id: res.user.uid,
          })
        );
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img src="./snapLogo.png" alt="" />
        <Button variant="outlined" onClick={signIn}>
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Login;
