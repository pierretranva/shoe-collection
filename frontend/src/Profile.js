import {React, useState} from 'react';
import { Avatar, Box, Grid, Typography, Button, Stack, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import {useParams} from 'react-router-dom';

const Profile= ({isSignedIn, currentUser}) => {
    const { username } = useParams();

    const [signedIn, setSignedIn] = useState(isSignedIn);
    const [user, setUser] = useState(currentUser);

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      {/* Header with Avatar and Profile Info */}
      <Box display="flex" alignItems="center" gap={2} marginBottom={2}>
        <Avatar
          src="profile-picture-url.jpg"
          sx={{ width: 80, height: 80 }}
        />
        <Box flex="1">
          <Typography variant="h6">{username}</Typography>
          <Stack direction="row" spacing={2} mt={1}>
            {/* NEED TO CHECK IF FOLLOWING CURRENT USER */}
            {(signedIn && user === username )? <Button variant="outlined">Edit Profile</Button>: <Button variant="outlined">Following</Button>} 
            <Button variant="outlined">Message</Button>
            <IconButton>
              <HomeIcon />
            </IconButton>
          </Stack>
        </Box>
      </Box>

      {/* Follower Stats */}
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        <Typography>5 posts</Typography>
        <Typography>235 followers</Typography>
        <Typography>10 following</Typography>
      </Box>


      {/* Posts Grid */}
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Box component="img" src="post1.jpg" alt="Post 1" sx={{ width: '100%', height: '100%' }} />
        </Grid>
        <Grid item xs={4}>
          <Box component="img" src="post2.jpg" alt="Post 2" sx={{ width: '100%', height: '100%' }} />
        </Grid>
        <Grid item xs={4}>
          <Box component="img" src="post3.jpg" alt="Post 3" sx={{ width: '100%', height: '100%' }} />
        </Grid>
        <Grid item xs={4}>
          <Box component="img" src="post4.jpg" alt="Post 4" sx={{ width: '100%', height: '100%' }} />
        </Grid>
        <Grid item xs={4}>
          <Box component="img" src="post5.jpg" alt="Post 5" sx={{ width: '100%', height: '100%' }} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;