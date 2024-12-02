import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid2, Box, IconButton } from '@mui/material';
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Metrics() {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalLikes, setTotalLikes] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [sumPrice, setSumPrice] = useState(0);

    const overall_metrics = [
        {description: 'Total Users:', data: totalUsers},
        {description: 'Total Posts:', data: totalPosts},
        {description: 'Total Likes:', data: totalLikes},
        {description: 'Total Comments:', data: totalComments},
        {description: 'Total Shoe Prices:', data: '$' + sumPrice},
    ]

    const [oldestUser, setOldestUser] = useState("No Users");
    const [youngestUser, setYoungestUser] = useState("No Users");
    const [avgPrice, setAvgPrice] = useState(0);
    const [avgYear, setAvgYear] = useState(0);
    const [mostExpensiveShoe, setMostExpensiveShoe] = useState("No Shoes");
	const navigate = useNavigate();

    const admin_metrics = [
        {description: 'Oldest User:', data: oldestUser},
        {description: 'Youngest User:', data: youngestUser},
        {description: 'Average Shoe Price:', data: '$' + avgPrice.toFixed(2)},
        {description: 'Average Shoe Model Year:', data: avgYear.toFixed(2)},
        {description: 'Most Expensive Shoe:', data: mostExpensiveShoe},
    ]

	const handleHomeClick = () => {
		navigate("/admin");
	};

	useEffect(() => {
        axios
            .get(`http://localhost:8000/get_total_users`)
            .then((response) => setTotalUsers(response.data));
        axios
            .get(`http://localhost:8000/get_total_posts`)
            .then((response) => setTotalPosts(response.data));
        axios
            .get(`http://localhost:8000/get_total_likes`)
            .then((response) => setTotalLikes(response.data));
        axios
            .get(`http://localhost:8000/get_total_comments`)
            .then((response) => setTotalComments(response.data));
        axios
            .get(`http://localhost:8000/get_sum_price`)
            .then((response) => setSumPrice(response.data));
        axios
            .get(`http://localhost:8000/get_oldest_user`)
            .then((response) => setOldestUser(response.data));
        axios
            .get(`http://localhost:8000/get_youngest_user`)
            .then((response) => setYoungestUser(response.data));
        axios
            .get(`http://localhost:8000/get_avg_price`)
            .then((response) => setAvgPrice(response.data));
        axios
            .get(`http://localhost:8000/get_avg_year`)
            .then((response) => setAvgYear(response.data));
        axios
            .get(`http://localhost:8000/get_most_expensive_shoe`)
            .then((response) => setMostExpensiveShoe(response.data));
	}, []);

    const renderMetrics = (metric_type) => (
        <Grid2 container spacing={4} justifyContent="center">
            {metric_type.map((metric, index) => (
                <Grid2 item xs={12} sm={6} md={4} key={index}>
                    <Card sx={{ height:"150px", width:"300px", overflow:"hidden", wordWrap:"break-word", boxShadow: 3, padding: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'darkgray', marginBottom: 0, fontSize: '1.5rem' }}>
                                {metric.description}
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'dodgerblue', marginTop: 1, fontSize: '2rem' }}>
                                {metric.data}
                            </Typography>
                            <Typography variant="caption" sx={{ fontStyle: 'italic', color: 'darkgray', marginTop: 0 }}>
                                (currently in system)
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid2>
            ))}
        </Grid2>
    );

    return (
        <Box sx={{ padding: 4, backgroundColor: '#f5f5f5' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" position="relative" mb={4}>
                <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ width: '100%' }}>
                    Overall Metrics
                </Typography>
                <IconButton onClick={handleHomeClick} sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>
                    <HomeIcon sx={{ color: 'darkgray' }} />
                </IconButton>
            </Box>
            
            {renderMetrics(overall_metrics)}
            
            <Box mt={6} mb={4}>
                <Typography variant="h4" fontWeight="bold" textAlign="center">
                    Admin Metrics
                </Typography>
            </Box>
            
            {renderMetrics(admin_metrics)}
        </Box>
    );
};