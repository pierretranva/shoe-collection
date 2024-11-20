import "./UserPage.css";
import axios from "axios";
import { useState } from "react";
import ScrollingList from "./ScrollingList";
import { NavLink } from "react-router-dom";

export default function UserPage(props) {
	const [userUsername, setUserUsername] = useState(props.username);
	const [userVerified, setUserVerified] = useState(props.isSignedIn);
	const [loginErrorMessage, setLoginErrorMessage] = useState(false);

	const [posts, setPosts] = useState([]);

	if (posts.length === 0) {
        console.log(props)
        console.log(userUsername)
		axios.get(`http://127.0.0.1:8000/posts`, {params: {username: props.username, page_number:3}}).then((response) => {
			setPosts(response.data);
		});
	}

	return (
		<div className="App">
			<header className="App-header">
				{userVerified ? (
					<>
						<h1>Welcome {userUsername}</h1>
						{ScrollingList(posts)}
					</>
				) : (
					<>
						<h1>Welcome Guest</h1>
						<NavLink to="/login" style={{ }}>
							<h1 style={{ color: "grey", fontSize: "15px" }}>Login to Access all Features</h1>
						</NavLink>
						{ScrollingList(posts)}
					</>
				)}
			</header>
		</div>
	);
}
