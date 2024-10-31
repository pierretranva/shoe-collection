import './UserPage.css';
import axios from "axios";
import {useState} from "react";
import ScrollingList from "./ScrollingList";

export default function UserPage() {
    const [userUsername, setUserUsername] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userVerified, setUserVerified] = useState(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState(false);


    const [posts, setPosts] = useState([]);


    const handleUserLogin = async () => {
        try {
            setLoginErrorMessage(false);
            const loginResponse = await axios.put('http://localhost:8000/user/login', {
                "username": userUsername,
                "password": userPassword
            });

            const verified = loginResponse.data.status;
            if (verified) {
                setLoginErrorMessage(false);
                setUserVerified(true);
            } else {
                setLoginErrorMessage(true);
            }
        } catch (error) {
            console.error('User Login error:', error);
            setLoginErrorMessage(true);
        }
    };


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
                        <h2>User Login</h2>
                        <input
                            type="text"
                            placeholder="Email"
                            value={userUsername}
                            onChange={(e) => setUserUsername(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleUserLogin();
                                }
                            }}
                            style={{margin: '10px', padding: '10px'}}
                        />
                        <br/>
                        <input
                            type="password"
                            placeholder="Password"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleUserLogin();
                                }
                            }}
                            style={{margin: '10px', padding: '10px'}}
                        />
                        <br/>
                        <button onClick={handleUserLogin} style={{padding: '10px 20px'}}>
                            Login
                        </button>
                        {loginErrorMessage && <p style={{color: 'red'}}>Failed to Login</p>}
                    </>)
                }
            </header>
        </div>
    )
}