import { React, useState , useContext } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { TextField, Button, Typography, Box } from '@mui/material';
import { AuthContext } from "./AuthContext";

const Login = (props) => {
	const [userUsername, setUserUsername] = useState("");
	const [userPassword, setUserPassword] = useState("");
	const [loginErrorMessage, setLoginErrorMessage] = useState(false);
    const {handleSignIn, signedIn} = useContext(AuthContext)

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
                handleSignIn(userUsername, loginResponse.data.user_id);
            } else {
                setLoginErrorMessage(true);
            }
        } catch (error) {
            console.error('User Login error:', error);
            setLoginErrorMessage(true);
        }
    };

	return (
        <Box>
            {signedIn ? (
                <Typography variant="h4" fontWeight="bold" textAlign="center" mt={4}>
                    Already Logged In
                </Typography>
            ) : (
                <Box display="flex" alignItems="center" flexDirection="column" justifyContent="center" minHeight="100vh">
                    <Typography variant="h4" fontWeight="bold">
                        User Login
                    </Typography>

                    <Box width="33%" display="flex" flexDirection="column" alignItems="center">
                        <TextField
                            label="Username"
                            variant="outlined"
                            value={userUsername}
                            onChange={(e) => setUserUsername(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleUserLogin();
                            }}
                            fullWidth
                            margin="normal"
                        />

                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleUserLogin();
                            }}
                            fullWidth
                            margin="normal"
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleUserLogin}
                            style={{ marginTop: '20px' }}
                        >
                            Login
                        </Button>

                        <NavLink to="/register" style={{ textDecoration: "none", marginTop: '10px' }}>
                            <Typography
                                variant="h4"
                                fontWeight="bold"
                                style={{ color: "grey", fontSize: "15px" }}
                            >
                                Register Account
                            </Typography>
                        </NavLink>

                        {loginErrorMessage && (
                            <Typography color="error" style={{ marginTop: '10px' }}>
                                Invalid username or password. Please try again.
                            </Typography>
                        )}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default Login; 
