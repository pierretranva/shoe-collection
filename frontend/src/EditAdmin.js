import { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

export default function EditAdmin() {
    //Home button.
	const navigate = useNavigate();
    const handleHomeClick = () => {
		navigate("/adminedit");
	};

    const [adminID, setAdminID] = useState("");
    const [adminName, setAdminName] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const [entries, setEntries] = useState([]);

    //Function to fetch entries from the selected attribute.
    const fetchEntries = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/admins`);
            setEntries(response.data);
        } 
        catch (error) {
            console.error(`Failed to fetch admin entries.`);
        }
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    const getPayload = async () => {
        let payload = null;
        
        payload = {
            admin_id: parseInt(adminID),
            name: String(adminName),
            password: String(adminPassword),
        }
        
        try {
            await axios.put(`http://127.0.0.1:8000/update_admins`, payload);
            await fetchEntries();
            alert(`Admin updated successfully.`);
        } 
        catch (error) {
            alert(`Failed to update admin.`);
        }

        navigate("/adminedit");
    };

    return (
        <Box sx={{ padding: 4, backgroundColor: '#f5f5f5' ,minHeight: '100vh' }}>
            <Box display="flex" justifyContent="center" alignItems="center" position="relative" mb={4}>
                <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ width: '100%' }}>
                    Edit Admin
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
                    value={adminID}
                    onChange={(e) => setAdminID(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Username"
                    variant="outlined"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <Button variant="contained" color="primary" onClick={getPayload} style={{ marginTop: '20px' }}>
                    Edit Admin
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ width:"50%", margin:"0 auto", marginTop: 4, boxShadow: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight:"bold" }}>Admin ID</TableCell>
                            <TableCell sx={{ fontWeight:"bold" }}>Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entries.map((entry) => (
                            <TableRow key={entry.admin_id}>
                                <TableCell>{entry.admin_id}</TableCell>
                                <TableCell>{entry.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};


