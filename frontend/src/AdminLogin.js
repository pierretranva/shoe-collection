import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box } from '@mui/material';



export default function AdminLogin() {
    const [adminUsername, setAdminUsername] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const [loginErrorMessage, setLoginErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleAdminLogin = async () => {
        try {
            setLoginErrorMessage("");
            const loginResponse = await axios.put('http://localhost:8000/admin/login', {
                "username" : adminUsername,
                "password" : adminPassword
            });

            const verified = loginResponse.data.status;
            if (verified) {
                navigate("/admin");
            } else {
                setLoginErrorMessage("Failed to Login");
            }
        } catch (error) {
            console.error('Admin Login error:', error);
            setLoginErrorMessage("Failed to Login");
        }
    };

    return (
        <Box display="flex" alignItems="center" flexDirection="column" justifyContent="center" minHeight="100vh">
            <Typography variant="h4" fontWeight="bold">
                Admin Login
            </Typography>
            <Box width="33%" display="flex" flexDirection="column" alignItems="center">
                <TextField
                    label="Username"
                    variant="outlined"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAdminLogin();
                    }}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAdminLogin();
                    }}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" color="primary" onClick={handleAdminLogin} style={{ marginTop: '20px' }}>
                    Login
                </Button>
                <Typography color="error" style={{ marginTop: '10px' }}>
                    {loginErrorMessage}
                </Typography>
            </Box>
        </Box>
    );
}