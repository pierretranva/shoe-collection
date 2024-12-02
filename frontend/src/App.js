import { React } from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { AuthProvider } from "./AuthContext";

import Navbar from "./Navbar";
import UserPage from "./UserPage";
import AdminLogin from './AdminLogin';
import AdminPage from './AdminPage';
import Create from './Create';
import Remove from './Remove';
import Edit from './Edit';
import Metrics from "./Metrics";
import CreateUser from './CreateUser';
import CreateShoe from './CreateShoe';
import CreateAdmin from './CreateAdmin';
import EditUser from './EditUser';
import EditShoe from './EditShoe';
import EditAdmin from './EditAdmin';
import EditPost from './EditPost';
import RemoveUser from './RemoveUser';
import RemoveShoe from './RemoveShoe';
import RemoveAdmin from './RemoveAdmin';
import RemovePost from './RemovePost';
import RegisterAccount from "./RegisterAccount";
import Login from "./Login";
import Profile from "./Profile";
import CreatePost from "./CreatePost";
import Search from "./Search";

export default function App() {
	return (
		<AuthProvider>
			<Navbar />
			<Box>
				<Routes>
					<Route path="/" element={<UserPage />} />
					<Route path="/user" element={<UserPage />} />
					<Route path="/adminlogin" element={<AdminLogin />} />
					<Route path="/admin" element={<AdminPage />} />
					<Route path="/register" element={<RegisterAccount />} />
					<Route path="/login" element={<Login />} />
					<Route path="/create" element={<CreatePost />} />
					<Route path="/profile/:profileUsername" element={<Profile />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/adminmetrics" element={<Metrics />} />
					<Route path="/admincreate" element={<Create />} />
					<Route path="/adminedit" element={<Edit />} />
					<Route path="/adminremove" element={<Remove />} />
                    <Route path="/search" element={<Search/>}/>
					<Route path="/createuser" element={<CreateUser />} />
					<Route path="/createshoe" element={<CreateShoe />} />
					<Route path="/createadmin" element={<CreateAdmin />} />
					<Route path="/removeuser" element={<RemoveUser />} />
					<Route path="/removeshoe" element={<RemoveShoe />} />
					<Route path="/removepost" element={<RemovePost />} />
					<Route path="/removeadmin" element={<RemoveAdmin />} />
					<Route path="/edituser" element={<EditUser />} />
					<Route path="/editshoe" element={<EditShoe />} />
					<Route path="/editpost" element={<EditPost />} />
					<Route path="/editadmin" element={<EditAdmin />} />
				</Routes>
			</Box>
		</AuthProvider>
	);
}
