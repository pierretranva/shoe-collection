// import "./UserPage.css";
import axios from "axios";
import { useState, useEffect } from "react";
import ScrollingList from "./ScrollingList";
import { NavLink } from "react-router-dom";
import {Pagination, Box} from "@mui/material";

export default function UserPage(props) {
	const [userUsername, setUserUsername] = useState(null);
    const [userId, setUserId] = useState(null);
	const [userVerified, setUserVerified] = useState(null);
    const [page, setPage] = useState(1);

	const [posts, setPosts] = useState([]);

    useEffect(() =>{
        axios.get(`http://127.0.0.1:8000/posts`, {params: {username: props.username, page_number:page}}).then((response) => {
			setPosts(response.data);
		});
    },[page])
    useEffect(() => {
        console.log(props)
        setUserUsername(props.username)
        setUserId(props.userId)
        setUserVerified(props.isSignedIn)
        console.log("set all")
    }, [])

	// if (posts.length === 0) {
    //     console.log(props)
    //     console.log(userUsername)
	// 	axios.get(`http://127.0.0.1:8000/posts`, {params: {username: props.username, page_number:page}}).then((response) => {
	// 		setPosts(response.data);
	// 	});
	// }

	return (
		<>
				{userVerified ? (
					<Box sx={{maxWidth: 600, margin: 'auto', padding: 2}}>
						<h1>Welcome {userUsername}</h1>
						{ScrollingList(posts, userId)}
                        <Pagination count={10} page={page} onChange={(e,value)=>{ console.log(value)
                            setPage(value)}}/>
					</Box>
				) : (
					<Box sx={{maxWidth: 600, margin: 'auto', padding: 2}}>
                        
						<h1>Welcome Guest</h1>
						<NavLink to="/login" style={{ }}>
							<h1 style={{ color: "grey", fontSize: "15px" }}>Login to Access all Features</h1>
						</NavLink>
						{/* {ScrollingList(posts, null)} */}
                        <Pagination count={10} page={page} onChange={(e,value)=>{ console.log(value)
                            setPage(value)}}/>

					</Box>
				)}
		</>
	);
}
