import { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

export default function RemoveUser() {
    //Home button.
	const navigate = useNavigate();
    const handleHomeClick = () => {
		navigate("/adminremove");
	};

    const [deleteID, setDeleteID] = useState("");
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

    useEffect(() => {
        fetchEntries();
    }, []);

    //Sets the payload.
    const getPayload = async () => {
        try {
            await axios.delete(`http://127.0.0.1:8000/users/${deleteID}`);
            await fetchEntries();
            alert(`User with ID ${deleteID} deleted successfully.`);
        } 
        catch (error) {
            alert(`Failed to delete User with ID ${deleteID}.`);
        }

        navigate("/adminremove");
    };

    return (
        <Box sx={{ padding: 4, backgroundColor: '#f5f5f5' ,minHeight: '100vh' }}>
            <Box display="flex" justifyContent="center" alignItems="center" position="relative" mb={4}>
                <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ width: '100%' }}>
                    Remove User
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
                    value={deleteID}
                    onChange={(e) => setDeleteID(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                
                <Button variant="contained" color="primary" onClick={getPayload} style={{ marginTop: '20px' }}>
                    Remove User
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ width:"50%", margin:"0 auto", marginTop: 4, boxShadow: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight:"bold" }}>User ID</TableCell>
                            <TableCell sx={{ fontWeight:"bold" }}>Name</TableCell>
                            <TableCell sx={{ fontWeight:"bold" }}>Date of Birth</TableCell>
                            <TableCell sx={{ fontWeight:"bold" }}>Hometown</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entries.map((entry) => (
                            <TableRow key={entry.user_id}>
                                <TableCell>{entry.user_id}</TableCell>
                                <TableCell>{entry.name}</TableCell>
                                <TableCell>{entry.date_of_birth}</TableCell>
                                <TableCell>{entry.hometown}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
