import { StopRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import ReactTimeago from "react-timeago";
import "./chat.css";
import { setSelectedImage } from "../../features/appSlice";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router";

const Chat = (props) => {
    const { id, imageUrl, read, username, timestamp, profilePic } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const openImage = () => {
        if (!read) {
            dispatch(setSelectedImage(imageUrl));
            const document = doc(db, "snaps", id);
            setDoc(document, { read: true }, { merge: true }).then(() => {
                navigate("/chats/view");
            });
        }
    };
    return (
        <div onClick={openImage} className="chat">
            <Avatar className="chat_avatar" src={profilePic} />
            <div className="chat_info">
                <h4>{username}</h4>
                <p>
                    {!read && "Tap to view - "}
                    <ReactTimeago
                        date={new Date(timestamp?.toDate()).toUTCString()}
                    />
                </p>
            </div>
            {!read && <StopRounded className="chat_readIcon" />}
        </div>
    );
};

export default Chat;
