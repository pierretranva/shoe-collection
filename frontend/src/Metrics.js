import { useEffect, useState } from "react";
import { Avatar, Box, Typography, Button, Stack, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Metrics() {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalLikes, setTotalLikes] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [sumPrice, setSumPrice] = useState(0);

    const [oldestUser, setOldestUser] = useState("No Users");
    const [youngestUser, setYoungestUser] = useState("No Users");
    const [avgPrice, setAvgPrice] = useState(0);
    const [avgYear, setAvgYear] = useState(0);
    const [mostExpensiveShoe, setMostExpensiveShoe] = useState("No Shoes");
	const navigate = useNavigate();

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
	});

	return (
        <Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
            <IconButton onClick={handleHomeClick}>
							<HomeIcon />
			</IconButton>

			{/* Overall Metrics */}
			<Box display="flex" justifyContent="space-between" marginBottom={2}>
                <Typography>Total Users: {totalUsers}</Typography>
                <Typography>Total Posts: {totalPosts}</Typography>
                <Typography>Total Likes: {totalLikes}</Typography>
                <Typography>Total Comments:: {totalComments}</Typography>
                <Typography>Total Shoe Prices: {sumPrice}</Typography>
			</Box>

            {/* Admin Metrics */}
			<Box display="flex" justifyContent="space-between" marginBottom={2}>
                <Typography>Oldest User: {oldestUser}</Typography>
                <Typography>Youngest User: {youngestUser}</Typography>
                <Typography>Average Shoe Price: {avgPrice}</Typography>
                <Typography>Average Shoe Model Year: {avgYear}</Typography>
                <Typography>Most Expensive Shoe: {mostExpensiveShoe}</Typography>
			</Box>
            
		</Box>
	);
};