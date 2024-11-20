import React from "react";
import './ScrollingList.css';
import PostContainer from "./PostContainer";
const ScrollingList = (posts) => {
    if (!posts || !Array.isArray(posts) || posts.length === 0) {
        return <div>No posts available.</div>;
    }
    console.log(posts);

    const handleImageError = (e) => {
        e.target.src = "https://www.shutterstock.com/image-vector/running-shoe-icon-on-white-260nw-223473190.jpg";
    };

    return (
        <div className="scrolling-list-container">
            {posts.map((post) => (
                <PostContainer key={post.post_id} post_data={post} />
                // <div key={post.post_id} className="post-card">
                //     <div className="post-picture">
                //         <img src={post.picture_url} alt={post.caption} onError={handleImageError}/>
                //     </div>
                //     <div className="post-details">
                //         <h2>{post.caption}</h2>
                //         {post.is_selling && (
                //             <div className="selling-info">
                //                 <p>Price: ${post.price}</p>
                //                 <a href={post.selling_link} target="_blank" rel="noopener noreferrer">
                //                     Buy Now
                //                 </a>
                //             </div>
                //         )}
                //         <p className="post-date">Date: {post.date}</p>
                //     </div>
                // </div>
            ))}
        </div>
    );
};

export default ScrollingList;