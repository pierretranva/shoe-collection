import { useState, useEffect, useContext } from "react";
import {
	TextField,
	Checkbox,
	FormControlLabel,
	Button,
	Container,
	Typography,
	Box,
	FormControl,
	Autocomplete,
} from "@mui/material";
import axios from "axios";
import { AuthContext } from "./AuthContext";
const CreatePost = (props) => {
	const [caption, setCaption] = useState("");
	const [pictureUrl, setPictureUrl] = useState("");
	const [isSelling, setIsSelling] = useState(false);
	const [price, setPrice] = useState("");
	const [sellingLink, setSellingLink] = useState("");
	const [date, setDate] = useState("");
	const [shoeBrand, setShoeBrand] = useState("");
	const [shoeModel, setShoeModel] = useState("");
	const [shoeColor, setShoeColor] = useState("");
	const [shoeYear, setShoeYear] = useState("");

	const [validShoeBrands, setValidShoeBrands] = useState([]);
	const [validShoeModels, setValidShoeModels] = useState([]);
	const [validShoeColors, setValidShoeColors] = useState([]);
	const { username, signedIn } = useContext(AuthContext);

	useEffect(() => {
		axios
			.get("http://localhost:8000/shoe/brands")
			.then((response) => {
				setValidShoeBrands(response.data);
			})
			.catch((error) => {
				console.error("Error fetching shoe brands:", error);
			});
		axios
			.get("http://localhost:8000/shoe/colors")
			.then((response) => {
				setValidShoeColors(response.data);
			})
			.catch((error) => {
				console.error("Error fetching shoe colors:", error);
			});
	}, []);
	useEffect(() => {
		if (shoeBrand === "") {
			return;
		}
		axios
			.get("http://localhost:8000/shoe/models/" + shoeBrand)
			.then((response) => {
				setValidShoeModels(response.data);
			})
			.catch((error) => {
				console.error("Error fetching shoe models:", error);
			});
	}, [shoeBrand]);

	const handleSubmit = (event) => {
		event.preventDefault();
		// Call the add_post_to_database function with the form data
		add_post_to_database(
			caption,
			pictureUrl,
			isSelling,
			price,
			sellingLink,
			date,
			shoeBrand,
			shoeModel,
			shoeYear,
			shoeColor
		);
	};
	const add_post_to_database = (
		caption,
		picture_url,
		is_selling,
		price,
		selling_link,
		date,
		brand,
		model,
		year,
		color
	) => {
		axios
			.put("http://localhost:8000/post", {
				username: username,
				caption: caption,
				picture_url: picture_url,
				is_selling: +is_selling,
				price: parseInt(price),
				selling_link: selling_link,
				date: date,
				brand: brand,
				model: model,
				year: year,
				color: color,
			})
			.then((response) => {
				setCaption("");
				setPictureUrl("");
				setIsSelling(false);
				setPrice("");
				setSellingLink("");
				setDate("");
				setShoeBrand("");
				setShoeModel("");
				setShoeYear("");
				setShoeColor("");
				if (response.status === 200) {
					alert("Post added successfully");
				}
			})
			.catch((error) => {
				console.error("Error adding post to database:", error);
			});
	};

	if (!signedIn) {
		return (
			<Container maxWidth="sm">
				<Typography variant="h4" component="h1" gutterBottom align="center" sx={{ paddingTop: 2 }}>
					Please sign in to create a post
				</Typography>
			</Container>
		);
	}

	return (
		<Container maxWidth="sm">
			<Typography variant="h4" component="h1" gutterBottom align="center" sx={{ paddingTop: 2 }}>
				Create Post
			</Typography>
			<Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
				<FormControl fullWidth>
					<Autocomplete
						options={validShoeBrands}
						getOptionLabel={(option) => option}
						renderInput={(params) => <TextField {...params} label="Shoe Brand" />}
						value={shoeBrand}
						onChange={(event, newValue) => {
							setShoeBrand(newValue);
						}}
						freeSolo
					/>
				</FormControl>
				<FormControl fullWidth>
					<Autocomplete
						options={validShoeModels}
						getOptionLabel={(option) => option}
						renderInput={(params) => <TextField {...params} label="Shoe Model" />}
						value={shoeModel}
						onChange={(event, newValue) => {
							setShoeModel(newValue);
						}}
						freeSolo
					/>
				</FormControl>
				<FormControl fullWidth>
					<Autocomplete
						options={validShoeColors}
						getOptionLabel={(option) => option}
						renderInput={(params) => <TextField {...params} label="Shoe Color" />}
						value={shoeColor}
						onChange={(event, newValue) => {
							setShoeColor(newValue);
						}}
						freeSolo
					/>
				</FormControl>
				<TextField
					label="Shoe Year"
					type="number"
					value={shoeYear}
					onChange={(e) => setShoeYear(e.target.value)}
					required
				/>
				<FormControlLabel
					control={<Checkbox checked={isSelling} onChange={(e) => setIsSelling(e.target.checked)} />}
					label="Is Selling"
				/>
				{isSelling && (
					<TextField label="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
				)}
				{isSelling && (
					<TextField
						label="Selling Link"
						value={sellingLink}
						onChange={(e) => setSellingLink(e.target.value)}
						required
					/>
				)}
				<TextField
					label="Date Posted"
					type="date"
					value={date}
					onChange={(e) => setDate(e.target.value)}
					InputLabelProps={{
						shrink: true,
					}}
					required
				/>
				<TextField
					label="Caption"
					value={caption}
					onChange={(e) => setCaption(e.target.value)}
					required
					multiline
					minRows={3}
				/>
				<TextField label="Picture URL" value={pictureUrl} onChange={(e) => setPictureUrl(e.target.value)} required />
				{pictureUrl && (
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							marginTop: 2,
						}}
					>
						<Typography variant="h6" component="h2">
							Image Preview
						</Typography>
						<Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
							<img src={pictureUrl} alt="Preview" style={{ maxWidth: "100%", maxHeight: "300px" }} />
						</Box>
					</Box>
				)}

				<Button type="submit" variant="contained" color="primary">
					Create Post
				</Button>
			</Box>
		</Container>
	);
};

export default CreatePost;
