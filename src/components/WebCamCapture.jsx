import { RadioButtonUnchecked } from "@mui/icons-material";
import React, { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";

import { setCameraImg } from "../features/camSlice";

import "./WebCamCapture.css";

const videoConstraint = {
  width: 250,
  height: 400,
  facingMode: "user",
};

function WebCamCapture() {
  const webCamRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const capture = useCallback(() => {
    const imgSrc = webCamRef.current.getScreenshot();
    dispatch(setCameraImg(imgSrc));

    navigate("/preview");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webCamRef]);
  return (
    <div className="webcamCapture">
      <Webcam
        audio={false}
        height={videoConstraint.height}
        width={videoConstraint.width}
        ref={webCamRef}
        screenshotFormat={"image/jpeg"}
        videoConstraints={videoConstraint}
      />
      <RadioButtonUnchecked
        className="webcamCapture__btn"
        onClick={capture}
        fontSize="large"
      />
    </div>
  );
}

export default WebCamCapture;
