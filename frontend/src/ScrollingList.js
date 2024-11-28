import React from "react";
import "./ScrollingList.css";
import PostContainer from "./PostContainer";

const ScrollingList = (posts, userId) => {
	if (!posts || !Array.isArray(posts) || posts.length === 0) {
		return <div>No posts available.</div>;
	}

	return (
		<div className="scrolling-list-container">
			{posts.map((post) => (
				<PostContainer key={post.post_id} post_data={post} userId={userId} />
			))}
		</div>
	);
};

export default ScrollingList;
