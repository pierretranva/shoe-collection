import "./UserPage.css";
import axios from "axios";
import { useState } from "react";
import ScrollingList from "./ScrollingList";
import { NavLink } from "react-router-dom";

export default function UserPage() {
	const [userUsername, setUserUsername] = useState("");
	const [userPassword, setUserPassword] = useState("");
	const [userVerified, setUserVerified] = useState(false);
	const [loginErrorMessage, setLoginErrorMessage] = useState(false);

	const [posts, setPosts] = useState([]);

	if (posts.length === 0) {
		axios.get(`http://127.0.0.1:8000/posts`).then((response) => {
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
