// import "./UserPage.css";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import ScrollingList from "./ScrollingList";
import { NavLink } from "react-router-dom";
import {Pagination, Box} from "@mui/material";
import { AuthContext } from "./AuthContext";

export default function UserPage(props) {
    const [page, setPage] = useState(1);
	const [posts, setPosts] = useState([]);
    const {username, userId, signedIn} = useContext(AuthContext)
    useEffect(() =>{
        axios.get(`http://127.0.0.1:8000/posts`, {params: {username: username, page_number:page}}).then((response) => {
			setPosts(response.data);
		});
    },[page])


	return (
		<>
				{signedIn ? (
					<Box sx={{maxWidth: 600, margin: 'auto', padding: 2}}>
						<h1>Welcome {username}</h1>
						{ScrollingList(posts, userId)}
                        <Pagination count={10} page={page} onChange={(e,value)=>{
                            setPage(value)}}/>
					</Box>
				) : (
					<Box sx={{maxWidth: 600, margin: 'auto', padding: 2}}>
                        
						<h1>Welcome Guest</h1>
						<NavLink to="/login" style={{ }}>
							<h1 style={{ color: "grey", fontSize: "15px" }}>Login to Access all Features</h1>
						</NavLink>
						{/* {ScrollingList(posts, null)} */}
                        <Pagination count={10} page={page} onChange={(e,value)=>{
                            setPage(value)}}/>

					</Box>
				)}
		</>
	);
}
