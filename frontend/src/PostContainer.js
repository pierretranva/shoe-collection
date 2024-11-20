import { React, useState, useEffect } from "react";
import {CardActions, Card, CardHeader, CardMedia, CardContent, Typography, IconButton, Box } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";

const PostCard = (props) => {
    let { brand, caption, color, comment_count, creator, date, is_selling, like_count, liked, model, picture_url,post_id, price, selling_link, year} = props.post_data
    const [isLiked, setIsLiked] = useState(liked==1);

    const handleLike = () => {
        setIsLiked(!isLiked);
    }
    if (is_selling) {
        caption = `${caption} - ${brand} ${model} ${year} ${color} $${price}`
    }
	return (
		<Card sx={{  width: 'min(470px, 100vw)', margin: "20px auto", backgroundColor: 'rgba(255,255,255,.5)' }}>
			{/* Header */}
			<CardHeader title={creator} subheader={date} />

			{/* Image */}
			<CardMedia component="img" sx={{ minHeight: 300 }} src={picture_url} alt="Instagram post" />
			<CardActions disableSpacing>
				<IconButton onClick={handleLike}>
                    {isLiked ? <FavoriteIcon sx={{color: 'rgba(255,48,64,1)'}}/> : <FavoriteBorderOutlinedIcon />}
				</IconButton>
				<IconButton>
					<CommentIcon />
				</IconButton>
			</CardActions>

			{/* Content */}
			<CardContent>
                <Typography>{like_count} likes</Typography>
                {/* <Box component="span" fontWeight='bold'>{creator}</Box> */}
				<Typography variant="body2" color="text.secondary">{" "+caption}
				</Typography>
			</CardContent>

		</Card>
	);
};
export default PostCard;
