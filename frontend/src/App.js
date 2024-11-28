import { React, useEffect, useState } from "react";
import { Route, Routes, Router, useNavigate } from "react-router-dom";
import "./App.css";
import { Box } from "@mui/material";
import { AuthProvider } from "./AuthContext";

import Navbar from "./Navbar";
import UserPage from "./UserPage";
import AdminPage from "./AdminPage";
import RegisterAccount from "./RegisterAccount";
import Login from "./Login";
import Profile from "./Profile";
import CreatePost from "./CreatePost";
import Metrics from "./Metrics";

export default function App() {
	return (
		<AuthProvider>
			<Navbar />
			<Box>
				<Routes>
					<Route path="/" element={<UserPage />} />
					<Route path="/user" element={<UserPage />} />
					<Route path="/admin" element={<AdminPage />} />
					<Route path="/register" element={<RegisterAccount />} />
					<Route path="/login" element={<Login />} />
					<Route path="/create" element={<CreatePost />} />
					<Route path="/profile/:profileUsername" element={<Profile />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/metrics" element={<Metrics />} />
				</Routes>
			</Box>
		</AuthProvider>
	);
}
