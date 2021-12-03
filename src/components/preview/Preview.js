import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { resetImage, selectImage } from "../../features/cameraSlice";
import "./preview.css";
import CloseIcon from "@mui/icons-material/Close";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import CreateIcon from "@mui/icons-material/Create";
import NoteIcon from "@mui/icons-material/Note";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CropIcon from "@mui/icons-material/Crop";
import TimerIcon from "@mui/icons-material/Timer";
import SendIcon from "@mui/icons-material/Send";
import { v4 as uuid } from "uuid";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { selectUser } from "../../features/appSlice";

const Preview = () => {
    const image = useSelector(selectImage);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const user = useSelector(selectUser);
    useEffect(() => {
        if (!image) {
            navigate("/");
        }
    }, [image, navigate]);
    const closePreview = () => {
        dispatch(resetImage());
    };
    const sendPost = () => {
        const id = uuid();
        const storageRef = ref(storage, `snaps/${id}`);
        setLoading(true);
        uploadString(storageRef, image, "data_url").then((snapshot) => {
            console.log(snapshot);
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                addDoc(collection(db, "snaps"), {
                    imageUrl: downloadURL,
                    username: user.username,
                    read: false,
                    profilePic: user.profilePic,
                    timestamp: serverTimestamp(),
                }).then(() => {
                    navigate("/chats");
                    dispatch(resetImage());
                });
            });
        });
    };
    return (
        <div className="preview">
            <CloseIcon className="preview_close" onClick={closePreview} />
            <div className="preview_toolbarRight">
                <TextFieldsIcon />
                <CreateIcon />
                <NoteIcon />
                <MusicNoteIcon />
                <AttachFileIcon />
                <CropIcon />
                <TimerIcon />
            </div>
            <img src={image} alt="" />
            <div onClick={sendPost} className="preview_footer">
                <h2>Send Now</h2>
                {!loading ? (
                    <SendIcon fontSize="small" className="preview_sendButton" />
                ) : (
                    <AutorenewIcon
                        fontSize="small"
                        className="preview_sendButton"
                    />
                )}
            </div>
        </div>
    );
};

export default Preview;
