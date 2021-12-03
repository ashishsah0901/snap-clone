import React, { useEffect } from "react";
import "./App.css";
import WebcamCapture from "./components/webcamcapture/WebcamCapture";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Preview from "./components/preview/Preview";
import Chats from "./components/chats/Chats";
import Chatview from "./components/chatview/Chatview";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/appSlice";
import Login from "./components/login/Login";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./firebase";

function App() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                dispatch(
                    login({
                        username: authUser.displayName,
                        profilePic: authUser.photoURL,
                        id: authUser.uid,
                    })
                );
            } else {
                dispatch(logout());
            }
        });
        return () => {
            unSubscribe();
        };
    }, [dispatch]);
    return (
        <div className="app">
            <Router>
                {!user ? (
                    <Login />
                ) : (
                    <>
                        <img
                            className="app_logo"
                            src="https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg"
                            alt=""
                        />
                        <div className="app_body">
                            <div className="app_bodyBackground">
                                <Routes>
                                    <Route
                                        exact
                                        path="/"
                                        element={<WebcamCapture />}
                                    />
                                    <Route
                                        exact
                                        path="/preview"
                                        element={<Preview />}
                                    />
                                    <Route
                                        exact
                                        path="/chats"
                                        element={<Chats />}
                                    />
                                    <Route
                                        exact
                                        path="/chats/view"
                                        element={<Chatview />}
                                    />
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
