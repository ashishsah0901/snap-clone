import { ChatBubble, Search } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./chats.css";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { auth, db } from "../../firebase";
import Chat from "../chat/Chat";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/appSlice";
import { signOut } from "@firebase/auth";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useNavigate } from "react-router";

const Chats = () => {
    const [posts, setPosts] = useState([]);
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const takeSnap = () => {
        navigate("/");
    };
    useEffect(() => {
        const q = query(collection(db, "snaps"), orderBy("timestamp", "desc"));
        const unSubscribe = onSnapshot(q, (snapshot) =>
            setPosts(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    imageUrl: doc.data().imageUrl,
                    profilePic: doc.data().profilePic,
                    read: doc.data().read,
                    username: doc.data().username,
                    timestamp: doc.data().timestamp,
                }))
            )
        );
        return () => {
            unSubscribe();
        };
    }, []);
    return (
        <div className="chats">
            <div className="chats_header">
                <Avatar
                    src={user.profilePic}
                    onClick={() => signOut(auth)}
                    className="chats_avatar"
                />
                <div className="chats_search">
                    <Search className="chats_searchIcon" />
                    <input type="text" placeholder="Friends" />
                </div>
                <ChatBubble className="chats_chatIcon" />
            </div>
            <div className="chats_posts">
                {posts.map((post) => (
                    <Chat
                        key={post.id}
                        id={post.id}
                        imageUrl={post.imageUrl}
                        read={post.read}
                        username={post.username}
                        timestamp={post.timestamp}
                        profilePic={post.profilePic}
                    />
                ))}
            </div>
            <RadioButtonUncheckedIcon
                className="chats_takePicture"
                onClick={takeSnap}
                fontSize="large"
            />
        </div>
    );
};

export default Chats;
