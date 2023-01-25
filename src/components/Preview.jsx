import {
  AttachFile,
  Close,
  Create,
  Crop,
  MusicNote,
  Note,
  SaveAlt,
  Send,
  TextFields,
  Timer,
} from "@mui/icons-material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import firebase from "firebase/compat/app";
import { saveAs } from "file-saver";

import { resetCameraImg, selectcameraImg } from "../features/camSlice";
import { db, storage } from "../firebase";

import "./Preview.css";
import { selectUser } from "../features/appSlice";

function Preview() {
  const cameraImg = useSelector(selectcameraImg);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!cameraImg) {
      navigate("/");
    }
  }, [cameraImg, navigate]);

  const closePreview = () => {
    dispatch(resetCameraImg());
  };

  const sendPost = () => {
    const id = uuid();

    const uploadTask = storage
      .ref(`posts/${id}`)
      .putString(cameraImg, "data_url");

    uploadTask.on(
      "state_change",
      null,
      (err) => {
        console.log(err);
      },
      () => {
        storage
          .ref("posts")
          .child(id)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              imageUrl: url,
              username: user.username,
              read: false,
              profilePic: user.profilePic,
              timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            navigate("/chats");
          });
      }
    );
  };

  const downloadImage = () => {
    saveAs(cameraImg, "image.jpg"); // Put your image url here.
  };

  return (
    <div className="preview">
      <Close className="preview__close" onClick={closePreview} />
      <div className="preview__toolbarRight">
        <TextFields />
        <Create />
        <Note />
        <MusicNote />
        <AttachFile />
        <Crop />
        <Timer />
      </div>
      <img src={cameraImg} alt="" />
      <div className="preview__footer">
        <div className="review__footer__right" onClick={sendPost}>
          <h2>send</h2>
          <Send fontSize="small" className="preview__sendIcon" />
        </div>
        <div className="review__footer__left" onClick={downloadImage}>
          <h2>save</h2>
          <SaveAlt fontSize="small" className="preview__saveIcon" />
        </div>
      </div>
    </div>
  );
}

export default Preview;
