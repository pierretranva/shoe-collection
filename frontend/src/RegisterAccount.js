import axios from "axios";
import {useState, useContext} from "react";
import {AuthContext} from "./AuthContext";
import { TextField, Button, Typography, Box } from '@mui/material';

export default function RegisterAccount(props) {
    const [userUsername, setUserUsername] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userDOB, setUserDOB] = useState("");
    const [userHometown, setUserHometown] = useState("");
    const [highlightRed, setHighlightRed] = useState({username: false, password: false, dob: false, hometown: false});
    const [registerErrorMessage, setRegisterErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const {handleSignIn} = useContext(AuthContext);

    const handleRegisterUser = async () => {
        try {
            setRegisterErrorMessage(false);

            const registerResponse = await axios.put('http://localhost:8000/add_users', {
                "name": userUsername,
                "password": userPassword,
                "date_of_birth": userDOB,
                "hometown": userHometown
            });

            if (registerResponse.status === 200) {
                setRegisterErrorMessage(null);
                setSuccessMessage("User successfully registered");
                setUserUsername("");
                setUserPassword("");
                setUserDOB("");
                setUserHometown("");
                handleSignIn(userUsername, registerResponse.data.user_id);
            }
        } catch (error) {
            console.error('User Login error:', error);
            setRegisterErrorMessage(error.response.data.detail);
        }
    };
    
    const handleSubmit = () =>{
        if (userUsername === "" || userPassword === "" || userDOB === "" || userHometown === "") {
            setRegisterErrorMessage("Please fill out all fields");
            
            setHighlightRed({
                username: userUsername === "" ? true : highlightRed.username,
                password: userPassword === "" ? true : highlightRed.password,
                dob: userDOB === "" ? true : highlightRed.dob,
                hometown: userHometown === "" ? true : highlightRed.hometown
            });
            
            return;
        }
        else{
            handleRegisterUser();
        }
    }

    return (
        <Box display="flex" alignItems="center" flexDirection="column" justifyContent="center" minHeight="100vh">
            <Typography variant="h4" fontWeight="bold">
                Register New User Account
            </Typography>
            <Box width="50%" display="flex" flexDirection="column" alignItems="center">
                <TextField 
                    label="Username"
                    variant="outlined"
                    value={userUsername}
                    onChange={(e) => setUserUsername(e.target.value)}
                    onKeyDown={(e) => {
                         if (e.key === 'Enter') {
                            handleSubmit();
                        }
                    }}
                    required
                    fullWidth
                    margin="normal"

                    sx={{
                        margin: 1,
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: highlightRed.username ? 'red' : 'black',
                            },
                        },
                    }}
                />

                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSubmit();
                        }
                    }}
                    required
                    fullWidth
                    margin="normal"

                    sx={{
                        margin: 1,
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: highlightRed.password ? 'red' : 'black',
                            },
                        },
                    }}
                /> 

                <TextField
                    label = "Date of Birth"
                    variant="outlined"
                    type="date"
                    value={userDOB}
                    onChange={(e) => setUserDOB(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSubmit();
                        }
                    }}
                    InputLabelProps={{
						shrink: true,
					}}
                    required
                    fullWidth
                    margin="normal"

                    sx={{
                        margin: 1,
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: highlightRed.dob ? 'red' : 'black',
                            },
                        },
                    }}
                />

                <TextField
                    label="Hometown"
                    variant="outlined"
                    value={userHometown}
                    onChange={(e) => setUserHometown(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSubmit();
                        }
                    }}
                    required
                    fullWidth
                    margin="normal"

                    sx={{
                        margin: 1,
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: highlightRed.hometown ? 'red' : 'black',
                            },
                        },
                    }}
                />            

                <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '20px' }}>
                    Register
                </Button>

                {registerErrorMessage && <p style={{color: 'red'}}>{registerErrorMessage}</p>}
                {successMessage && <p style={{color: 'green'}}>{successMessage}</p>}
            </Box>
        </Box>
    );
}