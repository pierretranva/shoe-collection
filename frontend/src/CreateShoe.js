import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, IconButton } from '@mui/material';
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

export default function CreateShoe() {
    //Home button.
	const navigate = useNavigate();
    const handleHomeClick = () => {
		navigate("/admincreate");
	};

    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [color, setColor] = useState("");
    const [entries, setEntries] = useState([]);
    
    //Function to fetch entries from the selected attribute.
    const fetchEntries = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/shoes`);
            setEntries(response.data);
        } 
        catch (error) {
            console.error(`Failed to fetch shoe entries.`);
        }
    };

    //Sets the payload.
    const getPayload = async () => {
        let payload = null;
        
        payload = {
            brand: String(brand),
            model: String(model),
            year: parseInt(year),
            color: String(color),
        }
        
        try {
            await axios.put(`http://127.0.0.1:8000/add_shoes`, payload);
            await fetchEntries();
            alert(`Shoe inserted successfully.`);
        } 
        catch (error) {
            alert(`Failed to insert shoe.`);
        }

        navigate("/admincreate");
    };

    return (
        <Box sx={{ padding: 4, backgroundColor: '#f5f5f5' ,minHeight: '100vh' }}>
            <Box display="flex" justifyContent="center" alignItems="center" position="relative" mb={4}>
                <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ width: '100%' }}>
                    Create Shoe
                </Typography>

                <IconButton onClick={handleHomeClick} sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>
                    <HomeIcon sx={{ color: 'darkgray' }} />
                </IconButton>
            </Box>
            
            <Box width="50%" display="flex" margin="0 auto" flexDirection="column" alignItems="center" justifyContent='center'>
                <TextField
                    label="Brand"
                    variant="outlined"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                
                <TextField
                    label="Model"
                    variant="outlined"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                
                <TextField
                    label="Year"
                    type="number"
                    variant="outlined"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                
                <TextField
                    label="Color"
                    variant="outlined"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                
                <Button variant="contained" color="primary" onClick={getPayload} style={{ marginTop: '20px' }}>
                    Create Shoe
                </Button>

            </Box>
        </Box>
    );
};