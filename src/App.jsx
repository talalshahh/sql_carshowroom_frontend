import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerManagement from "./components/CustomerManagement";
import SalesManagement from "./components/SalesManagement";
import CarManagement from "./components/CarManagement";
import Home from "./pages/Home";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/cars" element={<CarManagement />} />
				<Route path="/customers" element={<CustomerManagement />} />
				<Route path="/sales" element={<SalesManagement />} />
			</Routes>
		</Router>
	);
}

export default App;
