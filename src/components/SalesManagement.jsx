import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SalesManagement = () => {
	// State variables for managing sales data and UI interactions
	const [sales, setSales] = useState([]); // Holds sales records
	const [editSale, setEditSale] = useState(null); // Currently edited sale
	const [saleMenuToogle, setSaleMenuToogle] = useState(false); // Toggles the "Add Sale" modal
	const [newSale, setNewSale] = useState({
		// New sale form data
		car_id: "",
		customer_id: "",
		sale_date: "",
		total_price: "",
	});
	const [cars, setCars] = useState([]); // List of cars
	const [customers, setCustomers] = useState([]); // List of customers
	const [filterCarId, setFilterCarId] = useState(""); // Filter criteria by car ID
	const navigate = useNavigate();

	// Fetch sales records from the server
	const fetchSales = async () => {
		try {
			const response = await axios.get("http://localhost:5000/api/sales", {
				params: filterCarId ? { car_id: filterCarId } : {}, // Apply filter if specified
			});
			setSales(response.data); // Update sales state with fetched data
		} catch (error) {
			console.error("Error fetching sales:", error);
		}
	};

	// Fetch car and customer data from the server
	const fetchCarsAndCustomers = async () => {
		try {
			const carsResponse = await axios.get("http://localhost:5000/api/cars");
			const customersResponse = await axios.get(
				"http://localhost:5000/api/customers"
			);
			setCars(carsResponse.data); // Update cars state with fetched data
			setCustomers(customersResponse.data); // Update customers state with fetched data
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	// Add a new sale record
	const addSale = async () => {
		try {
			await axios.post("http://localhost:5000/api/sales", newSale);
			// Reset the new sale form
			setNewSale({
				car_id: "",
				customer_id: "",
				sale_date: "",
				total_price: "",
			});
			fetchSales(); // Refresh sales list
		} catch (error) {
			console.error("Error adding sale:", error);
		}
	};

	// Update an existing sale record
	const updateSale = async () => {
		try {
			await axios.put(
				`http://localhost:5000/api/sales/${editSale.id}`,
				editSale
			);
			setEditSale(null); // Close the edit modal
			fetchSales(); // Refresh sales list
		} catch (error) {
			console.error("Error updating sale:", error);
		}
	};

	// Delete a sale record
	const deleteSale = async (id) => {
		try {
			await axios.delete(`http://localhost:5000/api/sales/${id}`);
			fetchSales(); // Refresh sales list
		} catch (error) {
			console.error("Error deleting sale:", error);
		}
	};

	// Fetch data on component mount and when filter changes
	useEffect(() => {
		fetchSales();
		fetchCarsAndCustomers();
	}, [filterCarId]);

	return (
		<div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-10 px-4 flex flex-col items-center">
			{/* Page Header */}
			<header className="text-center mb-10">
				<h1 className="text-4xl font-extrabold text-indigo-400 mb-4">
					Sales Management
				</h1>
				<p className="text-gray-300 text-lg">
					Manage and track all your sales effortlessly.
				</p>
			</header>

			<div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-4xl">
				{/* Filter by Car Model */}
				<div className="mb-6">
					<label className="block text-gray-300 font-medium mb-2">
						Filter by Car Model
					</label>
					<select
						value={filterCarId}
						onChange={(e) => setFilterCarId(e.target.value)}
						className="bg-gray-700 text-gray-300 border border-gray-600 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-indigo-400"
					>
						<option value="">All Models</option>
						{cars.map((car) => (
							<option key={car.id} value={car.id}>
								{car.model} - {car.brand}
							</option>
						))}
					</select>
				</div>

				{/* Add New Sale Button */}
				<button
					onClick={() => setSaleMenuToogle(!saleMenuToogle)}
					className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition transform hover:scale-105 mb-6"
				>
					Add New Sale
				</button>

				{/* Sales Records */}
				<h2 className="text-xl font-semibold text-gray-300 mb-4">
					Sales Records
				</h2>
				{sales.length > 0 ? (
					<ul className="space-y-4">
						{sales.map((sale) => (
							<li
								key={sale.id}
								className="p-4 bg-gray-700 rounded-lg shadow-md flex justify-between items-center"
							>
								<div>
									<p>
										<strong>Car:</strong> {sale.model}
									</p>
									<p>
										<strong>Customer:</strong> {sale.customer_name}
									</p>
									<p>
										<strong>Date:</strong>{" "}
										{new Date(sale.sale_date).toLocaleDateString()}
									</p>
									<p>
										<strong>Price:</strong> ${sale.total_price}
									</p>
								</div>
								<div className="flex gap-2">
									{/* Edit Sale Button */}
									<button
										onClick={() => {
											setEditSale({ ...sale }); // Load sale data into edit form
										}}
										className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
									>
										Edit
									</button>

									{/* Delete Sale Button */}
									<button
										onClick={() => deleteSale(sale.id)}
										className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
									>
										Delete
									</button>
								</div>
							</li>
						))}
					</ul>
				) : (
					<p className="text-gray-400">No sales records available.</p>
				)}

				{/* Add Sale Modal */}
				{saleMenuToogle && (
					<div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center">
						<div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-md w-full">
							<h2 className="text-2xl font-semibold mb-4">Add New Sale</h2>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
								{/* Select Car for New Sale */}
								<select
									value={newSale.car_id}
									onChange={(e) => {
										const selectedValue = e.target.value;
										if (selectedValue === "add-car") {
											navigate("/cars");
										} else {
											setNewSale({ ...newSale, car_id: selectedValue });
										}
									}}
									className="bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2"
								>
									<option value="">Select Car</option>
									{cars.map((car) => (
										<option key={car.id} value={car.id}>
											{car.model} - {car.brand}
										</option>
									))}
									<option value="add-car">Add car</option>
								</select>
								{/* Select Customer for New Sale */}
								<select
									value={newSale.customer_id}
									onChange={(e) => {
										if (e.target.value === "add-customer") {
											navigate("/customers"); // Navigate to the desired route
										} else {
											setNewSale({ ...newSale, customer_id: e.target.value });
										}
									}}
									className="bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2"
								>
									<option value="">Select Customer</option>
									{customers.map((customer) => (
										<option key={customer.id} value={customer.id}>
											{customer.name}
										</option>
									))}
									<option value="add-customer">Add Customers</option>
								</select>
							</div>

							{/* Sale Date Input */}
							<input
								type="date"
								value={newSale.sale_date}
								onChange={(e) =>
									setNewSale({ ...newSale, sale_date: e.target.value })
								}
								className="bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 mb-4 w-full"
							/>
							{/* Sale Total Price Input */}
							<input
								type="number"
								placeholder="Total Price"
								value={newSale.total_price}
								onChange={(e) =>
									setNewSale({ ...newSale, total_price: e.target.value })
								}
								className="bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 mb-4 w-full"
							/>
							<div className="flex justify-end gap-4">
								{/* Cancel Add Sale Modal */}
								<button
									onClick={() => setSaleMenuToogle(false)}
									className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
								>
									Cancel
								</button>
								{/* Confirm Add Sale */}
								<button
									onClick={() => {
										addSale();
										setSaleMenuToogle(false);
									}}
									className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
								>
									Add Sale
								</button>
							</div>
						</div>
					</div>
				)}

				{/* Edit Sale Modal */}
				{editSale && (
					<div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center">
						<div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-md w-full">
							<h2 className="text-2xl font-semibold mb-4">Edit Sale</h2>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
								{/* Edit Car Selection */}
								<select
									value={editSale.car_id}
									onChange={(e) =>
										setEditSale({ ...editSale, car_id: e.target.value })
									}
									className="bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2"
								>
									<option value="">Select Car</option>
									{cars.map((car) => (
										<option key={car.id} value={car.id}>
											{car.model} - {car.brand}
										</option>
									))}
									<option value="" onClick={() => navigate("/customers")}>
										Add Customers
									</option>
								</select>

								{/* Edit Customer Selection */}
								<select
									value={editSale.customer_id}
									onChange={(e) =>
										setEditSale({ ...editSale, customer_id: e.target.value })
									}
									className="bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2"
								>
									<option value="">Select Customer</option>
									{customers.map((customer) => (
										<option key={customer.id} value={customer.id}>
											{customer.name}
										</option>
									))}
								</select>
							</div>
							{/* Edit Sale Date Input */}
							<input
								type="date"
								value={editSale.sale_date}
								onChange={(e) =>
									setEditSale({ ...editSale, sale_date: e.target.value })
								}
								className="bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 mb-4 w-full"
							/>
							{/* Edit Sale Total Price Input */}
							<input
								type="number"
								placeholder="Total Price"
								value={editSale.total_price}
								onChange={(e) =>
									setEditSale({ ...editSale, total_price: e.target.value })
								}
								className="bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 mb-4 w-full"
							/>
							<div className="flex justify-end gap-4">
								{/* Cancel Edit Sale Modal */}
								<button
									onClick={() => setEditSale(null)}
									className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
								>
									Cancel
								</button>
								{/* Confirm Edit Sale */}
								<button
									onClick={() => updateSale()}
									className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
								>
									Update Sale
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default SalesManagement;
