import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, IconButton } from '@mui/material';
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

export default function EditUser() {
    //Home button.
	const navigate = useNavigate();
    const handleHomeClick = () => {
		navigate("/adminedit");
	};

    const [userID, setUserID] = useState("");
    const [userName, setUserName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [hometown, setHometown] = useState("");
    const [entries, setEntries] = useState([]);

    //Function to fetch entries from the selected attribute.
    const fetchEntries = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/users`);
            setEntries(response.data);
        } 
        catch (error) {
            console.error(`Failed to fetch user entries.`);
        }
    };

    const getPayload = async () => {
        let payload = null;
        
        payload = {
            user_id: parseInt(userID),
            name: String(userName),
            date_of_birth: String(dateOfBirth),
            hometown: String(hometown),
        }
        
        try {
            await axios.put(`http://127.0.0.1:8000/update_users`, payload);
            await fetchEntries();
            alert(`User updated successfully.`);
        } 
        catch (error) {
            alert(`Failed to update user.`);
        }

        navigate("/adminedit");
    };

    return (
        <Box sx={{ padding: 4, backgroundColor: '#f5f5f5' ,minHeight: '100vh' }}>
            <Box display="flex" justifyContent="center" alignItems="center" position="relative" mb={4}>
                <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ width: '100%' }}>
                    Edit User
                </Typography>

                <IconButton onClick={handleHomeClick} sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>
                    <HomeIcon sx={{ color: 'darkgray' }} />
                </IconButton>
            </Box>
            
            <Box width="50%" display="flex" margin="0 auto" flexDirection="column" alignItems="center" justifyContent='center'>
                <TextField
                    label="ID Number"
                    type="number"
                    variant="outlined"
                    value={userID}
                    onChange={(e) => setUserID(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Username"
                    variant="outlined"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                
                <TextField
                    label="Date of Birth"
                    type="date"
                    variant="outlined"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    InputLabelProps={{
						shrink: true,
					}}
                    fullWidth
                    margin="normal"
                />
                
                <TextField
                    label="Hometown"
                    variant="outlined"
                    value={hometown}
                    onChange={(e) => setHometown(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                
                <Button variant="contained" color="primary" onClick={getPayload} style={{ marginTop: '20px' }}>
                    Edit User
                </Button>
            </Box>
        </Box>
    );
};