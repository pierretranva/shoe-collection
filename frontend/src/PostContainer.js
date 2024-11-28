import { React, useState, useEffect } from "react";
import {
	CardActions,
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	Typography,
	IconButton,
	Avatar,
	Box,
	TextField,
	List,
	ListItem,
	ListItemText,
	Divider,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";

const PostCard = (props) => {
	let {
		brand,
		caption,
		color,
		comment_count,
		creator,
		date,
		is_selling,
		like_count,
		liked,
		model,
		picture_url,
		post_id,
		price,
		selling_link,
		year,
	} = props.post_data;
	const [userId, setUserId] = useState(props.userId);
	const [isLiked, setIsLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(like_count);
	const [commentCount, setCommentCount] = useState(comment_count);
	const [pictureUrl, setPictureUrl] = useState(picture_url);
	const [commentText, setCommentText] = useState("");
	const [comments, setComments] = useState([]);

	useEffect(() => {
		let randomImage = [
			"https://plus.unsplash.com/premium_photo-1664536968285-a50bad09a44e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZHVua3N8ZW58MHx8MHx8fDA%3D",
			"https://images.unsplash.com/photo-1629211182663-34ccb8010c98?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHVua3N8ZW58MHx8MHx8fDA%3D",
			"https://images.unsplash.com/photo-1629211182693-6e2169041845?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZHVua3N8ZW58MHx8MHx8fDA%3D",
			"https://images.unsplash.com/photo-1644864644406-f7400ed651f1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZHVua3N8ZW58MHx8MHx8fDA%3D",
			"https://images.unsplash.com/photo-1719068648598-468f3f812511?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmV3JTIwYmFsYW5jZXxlbnwwfHwwfHx8MA%3D%3D",
			"https://images.unsplash.com/photo-1708088641654-531c89605597?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YXNpY3N8ZW58MHx8MHx8fDA%3D",
			"https://images.unsplash.com/photo-1628413993904-94ecb60f1239?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFzaWNzfGVufDB8fDB8fHww",
			"https://images.unsplash.com/photo-1597892657493-6847b9640bac?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGFzaWNzfGVufDB8fDB8fHww",
			"https://images.unsplash.com/photo-1620794341491-76be6eeb6946?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWRpZGFzfGVufDB8fDB8fHww",
			"https://images.unsplash.com/photo-1519931127525-6b6a7619a003?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFkaWRhc3xlbnwwfHwwfHx8MA%3D%3D",
			"https://images.unsplash.com/photo-1645753621005-18bea16d76ee?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9rYXxlbnwwfHwwfHx8MA%3D%3D",
			"https://images.unsplash.com/photo-1676041669566-fead69bd7007?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG9rYXxlbnwwfHwwfHx8MA%3D%3D",
			"https://images.unsplash.com/photo-1606906136205-01323599ed51?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8b2ZmJTIwd2hpdGV8ZW58MHx8MHx8fDA%3D",
		];
		if (!pictureUrl.includes("http")) {
			setPictureUrl(randomImage[Math.floor(Math.random() * randomImage.length)]);
		}
	}, []);
	useEffect(() => {
		if (userId === null) {
			return;
		} else {
			axios
				.get("http://localhost:8000/check_like", {
					params: {
						post_id: post_id,
						user_id: userId,
					},
				})
				.then((response) => {
					if (response.data.status) {
						setIsLiked(true);
					} else {
						setIsLiked(false);
					}
				});
		}
	}, [userId]);
	const handleSendComment = (e) => {
		let currDate = new Date().toISOString().slice(0, 19).replace("T", " ");
		axios
			.post("http://localhost:8000/comments", { post_id: post_id, user_id: userId, text: commentText, date: currDate })
			.then((response) => {
				// console.log(response.data)
				setCommentText("");
				handleGetComments();
			});
	};
	const handleLike = () => {
		if (userId === null) {
			return;
		} else {
			if (isLiked) {
				axios.post("http://localhost:8000/unlike_post", { post_id: post_id, user_id: userId });
				setIsLiked(false);
				setLikeCount(likeCount - 1);
			} else {
				axios.post("http://localhost:8000/like_post", { post_id: post_id, user_id: userId });
				setIsLiked(true);
				setLikeCount(likeCount + 1);
			}
		}
	};
	const handleGetComments = () => {
		axios.get("http://localhost:8000/comments/" + post_id).then((response) => {
			setComments(response.data);
			setCommentCount(response.data.length);
		});
	};

	if (is_selling) {
		caption = `${caption} - ${brand} ${model} ${year} ${color} $${price}`;
	}
	return (
		<Card sx={{ width: "min(470px, 100vw)", margin: "20px auto", backgroundColor: "rgba(255,255,255,.5)" }}>
			{/* Header */}
			<CardHeader
				avatar={<Avatar></Avatar>}
				title={creator}
				subheader={date}
				titleTypographyProps={{ variant: "h5" }}
			/>

			{/* Image */}
			<CardMedia component="img" sx={{ minHeight: 300 }} src={pictureUrl} alt="Instagram post" />
			<CardActions disableSpacing>
				<IconButton onClick={handleLike}>
					{isLiked ? <FavoriteIcon sx={{ color: "rgba(255,48,64,1)" }} /> : <FavoriteBorderOutlinedIcon />}
				</IconButton>
				<IconButton onClick={handleGetComments}>
					<CommentIcon />
				</IconButton>
			</CardActions>

			{/* Content */}
			<CardContent>
				<Typography>{likeCount} likes</Typography>
				{/* <Box component="span" fontWeight='bold'>{creator}</Box> */}
				<Typography variant="body2" color="text.secondary">
					{" " + caption}
				</Typography>
				<Box sx={{ alignItems: "left", display: "flex", flexDirection: "column" }}>
					<Accordion onChange={handleGetComments} sx={{ marginTop: 1, marginBottom: 1 }}>
						<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
							View all {commentCount} comments
						</AccordionSummary>
						<AccordionDetails sx={{ padding: "0" }}>
							<List sx={{ paddingBottom: 0 }}>
								{comment_count > 0 ? (
									comments.map((comment, num) => (
										<div key={num}>
											<Divider component="li" />
											<ListItem>
												<ListItemText primary={comment.username} secondary={comment.text} />
											</ListItem>
										</div>
									))
								) : (
									<></>
								)}
							</List>
						</AccordionDetails>
					</Accordion>
					<TextField
						label="Add a comment..."
						color={"black"}
						size="small"
						value={commentText}
						onChange={(e) => {
							setCommentText(e.target.value);
						}}
						slotProps={{
							input: {
								endAdornment: (
									<InputAdornment position="end">
										<SendIcon onClick={handleSendComment} />
									</InputAdornment>
								),
							},
						}}
					></TextField>
				</Box>
			</CardContent>
		</Card>
	);
};
export default PostCard;
