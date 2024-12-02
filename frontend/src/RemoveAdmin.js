import { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

export default function RemoveAdmin() {
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

    //Sets the payload.
    const getPayload = async () => {
        try {
            await axios.delete(`http://127.0.0.1:8000/admins/${deleteID}`);
            await fetchEntries();
            alert(`Admin with ID ${deleteID} deleted successfully.`);
        } 
        catch (error) {
            alert(`Failed to delete admin with ID ${deleteID}.`);
        }

        navigate("/adminremove");
    };

    return (
        <Box sx={{ padding: 4, backgroundColor: '#f5f5f5' ,minHeight: '100vh' }}>
            <Box display="flex" justifyContent="center" alignItems="center" position="relative" mb={4}>
                <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ width: '100%' }}>
                    Remove Admin
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
                    Remove Admin
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