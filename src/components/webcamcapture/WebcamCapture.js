import React, { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import "./webcamcapture.css";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useDispatch } from "react-redux";
import { setImage } from "../../features/cameraSlice";
import { useNavigate } from "react-router";

const WebcamCapture = () => {
    const webcamRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const videoConstraints = {
        width: 250,
        height: 400,
        facingMode: "user",
    };
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        dispatch(setImage(imageSrc));
        navigate("/preview");
    }, [webcamRef, dispatch, navigate]);
    return (
        <div className="webcamcapture">
            <Webcam
                audio={false}
                height={videoConstraints.height}
                width={videoConstraints.width}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                ref={webcamRef}
            />
            <RadioButtonUncheckedIcon
                className="webcamcapture_button"
                onClick={capture}
                fontSize="large"
            />
        </div>
    );
};

export default WebcamCapture;
