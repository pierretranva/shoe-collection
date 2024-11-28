import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [signedIn, setSignedIn] = useState(false);
    const [username, setUsername] = useState(null);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(localStorage).includes("username")) {
            setSignedIn(true);
            setUsername(JSON.parse(localStorage.getItem("username")));
            setUserId(JSON.parse(localStorage.getItem("user_id")));
            setSignedIn(JSON.parse(localStorage.getItem("signedIn")));
        }
    }, []);

    const handleSignIn = (currentUser, user_id) => {
        setSignedIn(true);
        setUsername(currentUser);
        setUserId(user_id);
        localStorage.setItem("username", JSON.stringify(currentUser));
        localStorage.setItem("user_id", JSON.stringify(user_id));
        localStorage.setItem("signedIn", JSON.stringify(true));
        navigate("/user");
    };

    const handleSignOut = () => {
        setSignedIn(false);
        setUsername(null);
        setUserId(null);
        localStorage.clear();
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ signedIn, username, userId, handleSignIn, handleSignOut }}>
            {children}
        </AuthContext.Provider>
    );
};