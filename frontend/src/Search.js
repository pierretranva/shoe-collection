import React, { useState, useContext } from "react";
import {
	Box,
	TextField,
	InputAdornment,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	List,
	ListItemText,
	Divider,
	ListItem,
    Avatar,
    ListItemAvatar,
    Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import ScrollingList from "./ScrollingList";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Search = () => {
	const [searchText, setSearchText] = useState("");
	const [searchType, setSearchType] = useState("user");
	const [searchResComponent, setSearchResComponent] = useState(null);
    const {userId, signedIn} = useContext(AuthContext)

	const handleSendSearch = () => {
		if (searchType === "user") {
			axios
				.get("http://localhost:8000/search", { params: { searchType: 'user', query: searchText } })
				.then((response) => {
					setSearchResComponent(handleUserSearchRes(response));
				});
		} else if(searchType === 'post'){
            if(!signedIn){
                setSearchResComponent(<Typography> Please Login to access all functionality</Typography>)
                return
            }
            axios.get("http://localhost:8000/search", { params: { searchType: 'post', query: searchText } })
            .then((response) => {
                setSearchResComponent(handlePostSearchRes(response));
            })
		}
        else if(searchType === 'Shoe Brand/Model'){
            if(!signedIn){
                setSearchResComponent(<Typography> Please Login to access all functionality</Typography>)
                return
            }
            axios.get("http://localhost:8000/search", { params: { searchType: 'shoe', query: searchText } })
            .then((response) => {
                setSearchResComponent(handlePostSearchRes(response));

        })}
	};
	const handleUserSearchRes = (response) => {
		return (
			<List sx={{ paddingBottom: 0, minWidth: 400 }}>
				{response.data.map((user, num) => (
                    <NavLink to={'/profile/'+ user.name}>
					<div key={num}>
						<Divider component="li" />
						<ListItem>
                            <ListItemAvatar><Avatar></Avatar></ListItemAvatar>
							<ListItemText primary={user.name} secondary={user.date_of_birth} />
						</ListItem>
					</div>
                    </NavLink>
				))}
			</List>
		);
	};
    const handlePostSearchRes = (response) => {
        return (
            <>{ScrollingList(response.data, userId)}</>

        )
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: "white",
                color: "black",
                paddingTop: 4, // Adjust the padding as needed
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    paddingTop: 2,
                }}
            >
                <FormControl sx={{ minWidth: 200, marginRight: 2 }}>
                    <InputLabel id="search-type-label">Search Type</InputLabel>
                    <Select
                        labelId="search-type-label"
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                        label="Search Type"
                    >
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="post">Post</MenuItem>
                        <MenuItem value="shoe">Shoe Brand/Model</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Search..."
                    color="primary"
                    size="small"
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSendSearch();
                        }
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SendIcon onClick={handleSendSearch} style={{ cursor: "pointer" }} />
                            </InputAdornment>
                        ),
                        style: { color: "black" },
                    }}
                    InputLabelProps={{
                        style: { color: "black" },
                    }}
                    sx={{
                        width: "300px",
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: "black",
                            },
                            "&:hover fieldset": {
                                borderColor: "black",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "black",
                            },
                        },
                    }}
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    paddingTop: 2,
                }}
            >
                {searchResComponent}
            </Box>
        </Box>
    );
};

export default Search;
