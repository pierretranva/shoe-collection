    
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


export default function App() {
    const [signedIn, setSignedIn] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    //check to see if user login info is stored in local storage
	useEffect(() => {
		if (Object.keys(localStorage).includes("username")) {
			setSignedIn(true);
			setUser(JSON.parse(localStorage.getItem("username")));
		}
	}, []);

    const handleSignIn = (currentUser) => {
        setSignedIn(true);
        setUser(currentUser);
        console.log("just login", currentUser)
        localStorage.setItem("username", JSON.stringify(currentUser));
        navigate("/user");
    };
    const handleLogout = () =>{
        setSignedIn(false);
        setUser(null);
        localStorage.clear();
    }
    const handleRegisterSuccess = (currentUser) =>{
        setUser(currentUser);
        setSignedIn(true);
        localStorage.setItem("username", JSON.stringify(currentUser));
        navigate("/user");
    }


	return (
    <div className="OuterContainer">
        <Navbar signedIn={signedIn} handleSignIn={handleSignIn} handleLogout={handleLogout} />

        <Routes>
            <Route path="/" element={<UserPage isSignedIn={signedIn} username={user}/>}/>
            <Route path="/user" element={<UserPage isSignedIn={signedIn} username={user}/>}/>
            <Route path="/admin" element={<AdminPage/>}/>
            <Route path="/register" element={<RegisterAccount handleRegisterSuccess={handleRegisterSuccess}/>}/>
            <Route path="/login" element={<Login handleLogin={handleSignIn}/>}/>
            {/* <Route path="/profile/:username" element={<Profile/>}/> */}
        </Routes>
        </div>
	);
}
