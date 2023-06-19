import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import CarOwners from "./components/CarOwners"
import Vehicles from "./components/Vehicles"
import EditVehicle from "./components/EditVehicle";

function App() {
	const user = localStorage.getItem("token");
	// const owner= localStorage.getItem("token")

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/create-owner" exact element={<CarOwners/>} />
			<Route path="/create-vehicles" exact element={<Vehicles/>} />
			<Route path="/edit-vehicle"  exact element={<EditVehicle/>} />
		</Routes>
	);
}

export default App;
