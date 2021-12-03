import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import "./login.css";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { login } from "../../features/appSlice";

const Login = () => {
    const dispatch = useDispatch();
    const signin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                dispatch(
                    login({
                        username: result.user.displayName,
                        profilePic: result.user.photoURL,
                        id: result.user.uid,
                    })
                );
            })
            .catch((error) => alert(error));
    };
    return (
        <div className="login">
            <div className="login_container">
                <img
                    src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg"
                    alt=""
                />
                <Button onClick={signin} variant="outlined">
                    Sign in
                </Button>
            </div>
        </div>
    );
};

export default Login;
