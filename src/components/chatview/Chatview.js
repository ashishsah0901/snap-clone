import React, { useCallback, useEffect } from "react";
import "./chatview.css";
import { useSelector } from "react-redux";
import { selectSelectedImage } from "../../features/appSlice";
import { useNavigate } from "react-router";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Chatview = () => {
    const selectedImage = useSelector(selectSelectedImage);
    const navigate = useNavigate();
    const exit = useCallback(() => {
        navigate("/chats");
    }, [navigate]);
    useEffect(() => {
        if (!selectedImage) {
            exit();
        }
    }, [exit, selectedImage]);
    return (
        <div className="chatview">
            <img src={selectedImage} onClick={exit} alt="" />
            <div className="chatview_timer">
                <CountdownCircleTimer
                    className="chatview_timer"
                    isPlaying
                    duration={10}
                    strokeWidth={6}
                    size={50}
                    colors={[
                        ["#004777", 0.33],
                        ["#f7B801", 0.33],
                        ["#A30000", 0.33],
                    ]}
                >
                    {({ remainingTime }) => {
                        if (remainingTime === 0) {
                            exit();
                        }
                        return remainingTime;
                    }}
                </CountdownCircleTimer>
            </div>
        </div>
    );
};

export default Chatview;
