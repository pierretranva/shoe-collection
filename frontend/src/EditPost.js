import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

export default function EditPost() {
    //Home button.
	const navigate = useNavigate();
    const handleHomeClick = () => {
		navigate("/adminedit");
	};

    const [postID, setPostID] = useState("");
    const [caption, setCaption] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");
    const [isSelling, setIsSelling] = useState(false);
    const [price, setPrice] = useState("");
    const [sellingLink, setSellingLink] = useState("");
    const [postDate, setPostDate] = useState("");
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

    const getPayload = async () => {
        let payload = null;
        
        payload = {
            post_id: parseInt(postID),
            caption: String(caption),
            picture_url: String(pictureUrl),
            is_selling: +isSelling,
            price: parseFloat(price),
            selling_link: String(sellingLink),
            date: String(postDate),
        }
        
        try {
            await axios.put(`http://127.0.0.1:8000/update_posts`, payload);
            await fetchEntries();
            alert(`Post updated successfully.`);
        } 
        catch (error) {
            alert(`Failed to update post.`);
        }

        navigate("/adminedit");
    };

    return (
        <Box sx={{ padding: 4, backgroundColor: '#f5f5f5' ,minHeight: '100vh' }}>
            <Box display="flex" justifyContent="center" alignItems="center" position="relative" mb={4}>
                <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ width: '100%' }}>
                    Edit Post
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
                    value={postID}
                    onChange={(e) => setPostID(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Caption"
                    variant="outlined"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                
                <TextField
                    label="Picture URL"
                    variant="outlined"
                    value={pictureUrl}
                    onChange={(e) => setPictureUrl(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                
                <TextField
					label="Date Posted"
					type="date"
					value={postDate}
					onChange={(e) => setPostDate(e.target.value)}
					InputLabelProps={{
						shrink: true,
					}}
                    fullWidth
                    margin="normal"
				/>

                <FormControlLabel
					control={<Checkbox checked={isSelling} onChange={(e) => setIsSelling(e.target.checked)} />}
					label="Is Selling"
                    fullWidth
                    margin="normal"
				/>
				
                {isSelling && (
					<TextField 
                        label="Price" 
                        type="number" 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                        fullWidth 
                        margin="normal" 
                    />
				)}
				
                {isSelling && (
					<TextField
						label="Selling Link"
						value={sellingLink}
						onChange={(e) => setSellingLink(e.target.value)}
                        fullWidth
                        margin="normal"
					/>
				)}
                
                <Button variant="contained" color="primary" onClick={getPayload} style={{ marginTop: '20px' }}>
                    Edit Post
                </Button>
            </Box>
        </Box>
    );
};