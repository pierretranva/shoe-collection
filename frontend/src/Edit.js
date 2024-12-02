import { Card, CardContent, Typography, Grid2, Box, IconButton } from '@mui/material';
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

export default function Edit() {
	//Home button.
    const navigate = useNavigate();
    const handleHomeClick = () => {
		navigate("/admin");
	};

    //Card types for edit.
    const cards = [
        {title: 'User', description: 'Edit a user account already in Shoe Collection.'},
        {title: 'Shoe', description: 'Edit a shoe already in Shoe Collection.'},
        {title: 'Post', description: 'Edit a post already in Shoe Collection.'},
        {title: 'Admin', description: 'Edit and change the password of an admin already in Shoe Collection.'},
    ]

    //Handles different edits based on the card type.
    const handleCardClick = (card_type) => {
        navigate(`/edit${card_type.toLowerCase()}`);
    }

    const renderCards = (cards) => (
        <Grid2 container spacing={4} justifyContent="center">
            {cards.map((card, index) => (
                <Grid2 item xs={12} sm={6} md={4} key={index}>
                    <Card onClick={() => handleCardClick(card.title)} sx={{ height:"250px", width:"250px", overflow:"hidden", wordWrap:"break-word", boxShadow: 3, padding: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <CardContent>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'dodgerblue', marginBottom: 0, fontSize: '2rem' }}>
                                {card.title}
                            </Typography>
                            <Typography variant="caption" sx={{ fontStyle: 'italic', color: 'darkgray', marginTop: 0 }}>
                                {card.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid2>
            ))}
        </Grid2>
    );

    return (
        <Box sx={{ padding: 4, backgroundColor: '#f5f5f5' ,minHeight: '100vh' }}>
            <Box display="flex" justifyContent="center" alignItems="center" position="relative" mb={4}>
                <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ width: '100%' }}>
                    Edit Menu
                </Typography>

                <IconButton onClick={handleHomeClick} sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>
                    <HomeIcon sx={{ color: 'darkgray' }} />
                </IconButton>
            </Box>
            
            {renderCards(cards)}
        </Box>
    );
};