import { React, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "./Login.css"
const Login = (props) => {
	const [userUsername, setUserUsername] = useState("");
	const [userPassword, setUserPassword] = useState("");
	const [userVerified, setUserVerified] = useState(false);
	const [loginErrorMessage, setLoginErrorMessage] = useState(false);

    const handleUserLogin = async () => {
        try {
            setLoginErrorMessage(false);
            const loginResponse = await axios.put('http://localhost:8000/user/login', {
                "username": userUsername,
                "password": userPassword
            });

            const verified = loginResponse.data.status;
            if (verified) {
                setLoginErrorMessage(false);
                setUserVerified(true);
                props.handleLogin(userUsername, loginResponse.data.user_id);
            } else {
                setLoginErrorMessage(true);
            }
        } catch (error) {
            console.error('User Login error:', error);
            setLoginErrorMessage(true);
        }
    };

	return (
		<div className="login">
			<h2>User Login</h2>
			<input
				type="text"
				placeholder="Username"
				value={userUsername}
				onChange={(e) => setUserUsername(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						handleUserLogin();
					}
				}}
				style={{ margin: "10px", padding: "10px" }}
			/>
			<br />
			<input
				type="password"
				placeholder="Password"
				value={userPassword}
				onChange={(e) => setUserPassword(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						handleUserLogin();
					}
				}}
				style={{ margin: "10px", padding: "10px" }}
			/>
			<br />
			<button onClick={handleUserLogin} style={{ padding: "10px 20px" }}>
				Login
			</button>
			<NavLink to="/register" style={{ textDecoration: "none" }}>
				<h1 style={{ color: "grey", fontSize: "15px" }}>Register Account</h1>
			</NavLink>
			{loginErrorMessage && <p style={{ color: "red" }}>Failed to Login</p>}
		</div>
	);
};

export default Login;
