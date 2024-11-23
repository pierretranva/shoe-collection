import "./UserPage.css";
import axios from "axios";
import { useState, useEffect } from "react";
import ScrollingList from "./ScrollingList";
import { NavLink } from "react-router-dom";
import {Pagination} from "@mui/material";
import usePagination from "@mui/material/usePagination/usePagination";

export default function UserPage(props) {
	const [userUsername, setUserUsername] = useState(props.username);
	const [userVerified, setUserVerified] = useState(props.isSignedIn);
	const [loginErrorMessage, setLoginErrorMessage] = useState(false);
    const [page, setPage] = useState(1);

	const [posts, setPosts] = useState([]);

    useEffect(() =>{
        axios.get(`http://127.0.0.1:8000/posts`, {params: {username: props.username, page_number:page}}).then((response) => {
			setPosts(response.data);
		});
    },[page])

	// if (posts.length === 0) {
    //     console.log(props)
    //     console.log(userUsername)
	// 	axios.get(`http://127.0.0.1:8000/posts`, {params: {username: props.username, page_number:page}}).then((response) => {
	// 		setPosts(response.data);
	// 	});
	// }

	return (
		<div className="App">
			<header className="App-header">
				{userVerified ? (
					<>
						<h1>Welcome {userUsername}</h1>
						{ScrollingList(posts)}
                        <Pagination/>
					</>
				) : (
					<>
						<h1>Welcome Guest</h1>
						<NavLink to="/login" style={{ }}>
							<h1 style={{ color: "grey", fontSize: "15px" }}>Login to Access all Features</h1>
						</NavLink>
						{ScrollingList(posts)}
                        <Pagination count={10} page={page} onChange={(e,value)=>{ console.log(value)
                            setPage(value)}}/>

					</>
				)}
			</header>
		</div>
	);
}
