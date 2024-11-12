    
import {React, useEffect, useState} from "react";
import {Route, Routes , useNavigate} from "react-router-dom";
import "./App.css";
import {Box} from "@mui/material";


import Navbar from "./Navbar";
import UserPage from "./UserPage";
import AdminPage from "./AdminPage";
import RegisterAccount from "./RegisterAccount";
import Login from "./Login";


export default function App() {
    const [signedIn, setSignedIn] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    //check to see if user login info is stored in local storage
	useEffect(() => {
		if (Object.keys(localStorage).includes("user")) {
			setSignedIn(true);
			setUser(JSON.parse(localStorage.getItem("user")));
		}
	}, []);

    const handleSignIn = (currentUser) => {
        setSignedIn(true);
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
    };
    const handleLogout = () =>{
        setSignedIn(false);
        setUser(null);
        localStorage.clear();
        navigate("/");
    }
    const handleRegisterSuccess = (user) =>{
        setUser(user);
        setSignedIn(true);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
    }


	return (
    <div className="OuterContainer">
        <Navbar signedIn={signedIn} handleSignIn={handleSignIn} handleLogout={handleLogout} />

        <Routes>
            <Route path="/" element={<UserPage/>}/>
            <Route path="/user" element={<UserPage/>}/>
            <Route path="/admin" element={<AdminPage/>}/>
            <Route path="/register" element={<RegisterAccount/>}/>
            <Route path="/login" element={<Login handleLogin={handleSignIn}/>}/>
        </Routes>
        </div>
	);
}
