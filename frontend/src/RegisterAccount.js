import './RegisterAccount.css';
import axios from "axios";
import {useState, useContext} from "react";
import {AuthContext} from "./AuthContext";

export default function RegisterAccount(props) {
    const [userUsername, setUserUsername] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userDOB, setUserDOB] = useState("");
    const [userHometown, setUserHometown] = useState("");
    const [highlightRed, setHighlightRed] = useState({username: false, password: false, dob: false, hometown: false});
    const [registerErrorMessage, setRegisterErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const {handleSignIn} = useContext(AuthContext);



    const handleRegisterUser = async () => {
        // console.log(typeof props.handleRegisterSuccess)
        try {
            setRegisterErrorMessage(false);
            // console.log(userUsername, userPassword, userDOB, userHometown)
            // console.log(typeof userUsername, typeof userPassword, typeof userDOB, typeof userHometown)
            const registerResponse = await axios.put('http://localhost:8000/add_users', {
                "name": userUsername,
                "password": userPassword,
                "date_of_birth": userDOB,
                "hometown": userHometown
            });

            // console.log(registerResponse);
            if (registerResponse.status === 200) {
                setRegisterErrorMessage(null);
                setSuccessMessage("User successfully registered");
                setUserUsername("");
                setUserPassword("");
                setUserDOB("");
                setUserHometown("");
                // OnRegisterSuccess(registerResponse.data); /##NEED TO PASS USER OBJECT ON REGISTER
                handleSignIn(userUsername, registerResponse.data.user_id);
            }
        } catch (error) {
            console.error('User Login error:', error);
            setRegisterErrorMessage(error.response.data.detail);
        }
    };
    
    const handleSubmit = () =>{
        if (userUsername === "" || userPassword === "" || userDOB === "" || userHometown === "") {
            setRegisterErrorMessage("Please fill out all fields");
            setHighlightRed({
                username: userUsername === "" ? true : highlightRed.username,
                password: userPassword === "" ? true : highlightRed.password,
                dob: userDOB === "" ? true : highlightRed.dob,
                hometown: userHometown === "" ? true : highlightRed.hometown
            });
            return;
        }
        else{
            handleRegisterUser();
            
        }
    }

    return (
        <div className="App">
            <div className="App-header">
                        <h2>Register New User Account</h2>
                        <input
                            type="text"
                            placeholder="Username"
                            value={userUsername}
                            onChange={(e) => setUserUsername(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSubmit();
                                }
                            }}
                            style={{margin: '10px', padding: '10px', borderColor: highlightRed.username? 'red' : 'black'}}
                            required
                        />
                        <br/>
                        <input
                            type="password"
                            placeholder="Password"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSubmit();
                                }
                            }}
                            style={{margin: '10px', padding: '10px',  borderColor: highlightRed.password? 'red' : 'black'}}
                            required
                        />
                         <br/>
                        <input
                            type="date"
                            value={userDOB}
                            onChange={(e) => setUserDOB(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSubmit();
                                }
                            }}
                            style={{margin: '10px', padding: '10px',  borderColor: highlightRed.dob? 'red' : 'black'}}
                            required
                        />
                         <br/>
                        <input
                            type="text"
                            placeholder="Hometown"
                            value={userHometown}
                            onChange={(e) => setUserHometown(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSubmit();
                                }
                            }}
                            style={{margin: '10px', padding: '10px', borderColor: highlightRed.hometown? 'red' : 'black'}}
                            required
                        />
                        <br/>
                        <button onClick={handleSubmit} style={{padding: '10px 20px'}}>
                            Register
                        </button>
                        {registerErrorMessage && <p style={{color: 'red'}}>{registerErrorMessage}</p>}
                        {successMessage && <p style={{color: 'green'}}>{successMessage}</p>}
            </div>
        </div>
    )
}