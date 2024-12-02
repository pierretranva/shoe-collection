import { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

export default function RemovePost() {
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
            const response = await axios.get(`http://127.0.0.1:8000/posts`);
            setEntries(response.data);
        } 
        catch (error) {
            console.error(`Failed to fetch post entries.`);
        }
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    //Sets the payload.
    const getPayload = async () => {
        try {
            await axios.delete(`http://127.0.0.1:8000/posts/${deleteID}`);
            await fetchEntries();
            alert(`Post with ID ${deleteID} deleted successfully.`);
        } 
        catch (error) {
            alert(`Failed to delete post with ID ${deleteID}.`);
        }

        navigate("/adminremove");
    };

    return (
        <Box sx={{ padding: 4, backgroundColor: '#f5f5f5' ,minHeight: '100vh' }}>
            <Box display="flex" justifyContent="center" alignItems="center" position="relative" mb={4}>
                <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ width: '100%' }}>
                    Remove Post
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
                    Remove Post
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ width:"60%", margin:"0 auto", marginTop: 4, boxShadow: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight:"bold" }}>Post ID</TableCell>
                            <TableCell sx={{ fontWeight:"bold" }}>Caption</TableCell>
                            <TableCell sx={{ fontWeight:"bold" }}>Is Selling</TableCell>
                            <TableCell sx={{ fontWeight:"bold" }}>Price</TableCell>
                            <TableCell sx={{ fontWeight:"bold" }}>Date</TableCell>
                            <TableCell sx={{ fontWeight:"bold" }}>Creator</TableCell>
                            <TableCell sx={{ fontWeight:"bold" }}>Like Count</TableCell>
                            <TableCell sx={{ fontWeight:"bold" }}>Comment Count</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entries.map((entry) => (
                            <TableRow key={entry.post_id}>
                                <TableCell>{entry.post_id}</TableCell>
                                <TableCell>{entry.caption}</TableCell>
                                <TableCell>{entry.is_selling}</TableCell>
                                <TableCell>{entry.price}</TableCell>
                                <TableCell>{entry.date}</TableCell>
                                <TableCell>{entry.creator}</TableCell>
                                <TableCell>{entry.like_count}</TableCell>
                                <TableCell>{entry.comment_count}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};