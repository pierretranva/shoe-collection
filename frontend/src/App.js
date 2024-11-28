    
import {React, useEffect, useState} from "react";
import {Route, Routes , useNavigate} from "react-router-dom";
import "./App.css";
import {Box} from "@mui/material";


import Navbar from "./Navbar";
import UserPage from "./UserPage";
import AdminPage from "./AdminPage";
import RegisterAccount from "./RegisterAccount";
import Login from "./Login";
import Profile from "./Profile";
import CreatePost from "./CreatePost";


export default function App() {
    const [signedIn, setSignedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    //check to see if user login info is stored in local storage
	useEffect(() => {
        console.log(Object.keys(localStorage))
		if (Object.keys(localStorage).includes("username")) {
			setSignedIn(true);
			setUser(JSON.parse(localStorage.getItem("username")));
			setUserId(JSON.parse(localStorage.getItem("user_id")));
            console.log("did it set")
		}
	},[]);

    const handleSignIn = (currentUser, user_id) => {
        setSignedIn(true);
        setUser(currentUser);
        setUserId(user_id);
        console.log("just login", currentUser, user_id)
        localStorage.setItem("username", JSON.stringify(currentUser));
        localStorage.setItem("user_id", JSON.stringify(user_id));
        navigate("/user");
    };
    const handleLogout = () =>{
        setSignedIn(false);
        setUser(null);
        localStorage.clear();
    }
    const handleRegisterSuccess = (currentUser, userId) =>{
        setUser(currentUser);
        setSignedIn(true);
        localStorage.setItem("username", JSON.stringify(currentUser));
        localStorage.setItem("user_id", JSON.stringify(userId));
        navigate("/user");
    }


	return (
    <div className="OuterContainer">
        <Navbar username={user} signedIn={signedIn} handleSignIn={handleSignIn} handleLogout={handleLogout} />

        <Routes>
            <Route path="/" element={<UserPage isSignedIn={signedIn} username={user}/>}/>
            <Route path="/user" element={<UserPage isSignedIn={signedIn} username={user} userId={userId}/>}/>
            <Route path="/admin" element={<AdminPage/>}/>
            <Route path="/register" element={<RegisterAccount handleRegisterSuccess={handleRegisterSuccess}/>}/>
            <Route path="/login" element={<Login handleLogin={handleSignIn}/>}/>
            <Route path="/create" element={<CreatePost isSignedIn={signedIn} username={user}/>}/>
            <Route path="/profile/:username" element={<Profile isSignedIn={signedIn} currentUser={user} userId={userId}/>}/>
            <Route path="/profile" element={<Profile isSignedIn={signedIn} currentUser={user} userId={userId}/>}/>
        </Routes>
        </div>
	);
}
