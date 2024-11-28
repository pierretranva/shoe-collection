import {useEffect, useState} from 'react';
import {Avatar, Box, Typography, Button, Stack, IconButton, TextField} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import {useNavigate, useParams} from 'react-router-dom';
import axios from "axios";
import ScrollingList from "./ScrollingList";

const Profile = ({isSignedIn, currentUser, userId}) => {
    const {username} = useParams();

    const [userPosts, setUserPosts] = useState([]);
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const [isFollowing, setIsFollowing] = useState(false);

    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [password, setPassword] = useState("");
    const [date, setDate] = useState("");
    const [hometown, setHometown] = useState("");

    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
    };

    const handleEditProfileClick = () => {
        setIsEditingProfile(true);
    };

    const handleSaveProfileClick = () => {
        axios.put("http://localhost:8000/edit_profile", {
            "user_id": userId,
            "password": password,
            "date_of_birth": date,
            "hometown": hometown
        }).then(() => {
            setPassword("");
            setIsEditingProfile(false);
        })
    };

    const handleUnfollowClick = () => {
        axios
            .get(`http://localhost:8000/users/name/${encodeURIComponent(username)}`)
            .then((response) => {
                const user_id = response.data[0]["user_id"];

                axios
                    .get(`http://localhost:8000/unfollow/${encodeURIComponent(userId)}/${encodeURIComponent(user_id)}`)
                    .then((response) => {
                        setIsFollowing(false);
                        setFollowers(followers - 1);
                    });
            });
    }


    const handleFollowClick = () => {
        axios
            .get(`http://localhost:8000/users/name/${encodeURIComponent(username)}`)
            .then((response) => {
                const user_id = response.data[0]["user_id"];

                axios
                    .get(`http://localhost:8000/follow/${encodeURIComponent(user_id)}/${encodeURIComponent(userId)}`)
                    .then((response) => {
                        setIsFollowing(true);
                        setFollowers(followers + 1);
                    });
            });
    }

    const handleCancelEditClick = () => {
        setIsEditingProfile(false);
    };

    useEffect(() => {
        setUserPosts([]);
        if (userId) {
            if (username) {
                try {
                    axios
                        .get(`http://localhost:8000/users/name/${encodeURIComponent(username)}`)
                        .then((response) => {
                            const user_id = response.data[0]["user_id"];

                            axios
                                .get(`http://localhost:8000/posts/user_id/${encodeURIComponent(user_id)}`)
                                .then((response) => setUserPosts(response.data));
                            axios
                                .get(`http://localhost:8000/followers/${encodeURIComponent(user_id)}`)
                                .then((response) => setFollowers(response.data));
                            axios
                                .get(`http://localhost:8000/following/${encodeURIComponent(user_id)}`)
                                .then((response) => setFollowing(response.data));
                            axios
                                .get(`http://localhost:8000/is_following/${encodeURIComponent(userId)}/${encodeURIComponent(user_id)}`)
                                .then((response) => setIsFollowing(response.data.status));
                        });

                } catch (error) {
                }
            } else if (currentUser) {
                axios
                    .get(`http://localhost:8000/posts/user_id/${encodeURIComponent(userId)}`)
                    .then((response) => setUserPosts(response.data));
                axios
                    .get(`http://localhost:8000/followers/${encodeURIComponent(userId)}`)
                    .then((response) => setFollowers(response.data));
                axios
                    .get(`http://localhost:8000/following/${encodeURIComponent(userId)}`)
                    .then((response) => setFollowing(response.data));
                axios.get(`http://localhost:8000/users/${encodeURIComponent(userId)}`)
                    .then((response) => {
                        setDate(response.data["date_of_birth"])
                        setHometown(response.data["hometown"])
                    });
            }
        }

    }, [username, userId]);

    if (isEditingProfile) {
        return (
            <Box sx={{maxWidth: 600, margin: 'auto', padding: 2}}>
                <Typography variant="h4" marginBottom={2}>Edit Profile</Typography>
                <TextField label="Password" type="password" fullWidth margin="normal" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                <TextField
                    label="Date of Birth"
                    type="date"
                    InputLabelProps={{shrink: true}}
                    fullWidth
                    margin="normal"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <TextField label="Hometown" fullWidth margin="normal" value={hometown}
                           onChange={(e) => setHometown(e.target.value)}/>
                <Stack direction="row" spacing={2} marginTop={2}>
                    <Button variant="contained" onClick={handleSaveProfileClick}>Save</Button>
                    <Button variant="outlined" onClick={handleCancelEditClick}>Cancel</Button>
                </Stack>
            </Box>
        );
    }

    return (
        <Box sx={{maxWidth: 600, margin: 'auto', padding: 2}}>
            {/* Header with Avatar and Profile Info */}
            <Box display="flex" alignItems="center" gap={2} marginBottom={2}>
                <Avatar
                    src="profile-picture-url.jpg"
                    sx={{width: 80, height: 80}}
                />
                <Box flex="1">
                    <Typography variant="h6">{username}</Typography>
                    <Stack direction="row" spacing={2} mt={1}>
                        {(isSignedIn && (!username || currentUser === username)) ?
                            <Button variant="outlined" onClick={handleEditProfileClick}>Edit Profile</Button> :
                            (isFollowing ?
                                <Button variant="outlined" onClick={handleUnfollowClick}>Unfollow</Button> :
                                <Button variant="outlined" onClick={handleFollowClick}>Follow</Button>)}
                        <IconButton onClick={handleHomeClick}>
                            <HomeIcon/>
                        </IconButton>
                    </Stack>
                </Box>
            </Box>

            {/* Follower Stats */}
            <Box display="flex" justifyContent="space-between" marginBottom={2}>
                <Typography>{userPosts.length} posts</Typography>
                <Typography>{followers} followers</Typography>
                <Typography>{following} following</Typography>
            </Box>

            {/* Posts Grid */}
            {ScrollingList(userPosts, userId)}
        </Box>
    );
};

export default Profile;
