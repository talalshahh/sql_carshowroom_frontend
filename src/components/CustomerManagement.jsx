import React, { useState, useEffect } from "react";
import axios from "axios";

const CustomerManagement = () => {
	const [customers, setCustomers] = useState([]);
	const [newCustomer, setNewCustomer] = useState({
		name: "",
		phone: "",
		email: "",
		address: "",
	});

	// Fetch All Customers
	const fetchCustomers = async () => {
		try {
			const response = await axios.get("http://localhost:5000/api/customers");
			setCustomers(response.data);
		} catch (error) {
			console.error("Error fetching customers:", error);
		}
	};

	// Add a New Customer
	const addCustomer = async () => {
		try {
			if (newCustomer.name && newCustomer.phone) {
				await axios.post("http://localhost:5000/api/customers", newCustomer);
				fetchCustomers();
				setNewCustomer({ name: "", phone: "", email: "", address: "" });
			}
		} catch (error) {
			console.error("Error adding customer:", error);
		}
	};

	// Delete a Customer
	const deleteCustomer = async (id) => {
		try {
			await axios.delete(`http://localhost:5000/api/customers/${id}`);
			fetchCustomers();
		} catch (error) {
			console.error("Error deleting customer:", error);
		}
	};

	// Load Customers on Component Mount
	useEffect(() => {
		fetchCustomers();
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center py-8">
			<div className="max-w-5xl w-full bg-gray-800 text-white shadow-xl rounded-lg p-8">
				<h1 className="text-3xl font-extrabold text-center text-indigo-400 mb-8">
					Customer Management
				</h1>

				{/* Add Customer Form */}
				<form action="">
					<div className="mb-10">
						<h2 className="text-xl font-semibold text-indigo-300 mb-4">
							Add a New Customer
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<input
								type="text"
								placeholder="Name"
								value={newCustomer.name}
								required
								onChange={(e) =>
									setNewCustomer({ ...newCustomer, name: e.target.value })
								}
								className="bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
							/>
							<input
								type="text"
								placeholder="Phone"
								value={newCustomer.phone}
								required
								onChange={(e) =>
									setNewCustomer({ ...newCustomer, phone: e.target.value })
								}
								className="bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
							/>
							<input
								type="email"
								placeholder="Email"
								value={newCustomer.email}
								onChange={(e) =>
									setNewCustomer({ ...newCustomer, email: e.target.value })
								}
								className="bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
							/>
							<textarea
								placeholder="Address"
								value={newCustomer.address}
								onChange={(e) =>
									setNewCustomer({ ...newCustomer, address: e.target.value })
								}
								className="bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
							></textarea>
						</div>
						<button
							onClick={addCustomer}
							type="submit"
							className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
						>
							Add Customer
						</button>
					</div>
				</form>

				{/* Customer List */}
				<div>
					<h2 className="text-xl font-semibold text-indigo-300 mb-4">
						Customer List
					</h2>
					{customers.length > 0 ? (
						<ul className="divide-y divide-gray-700">
							{customers.map((customer) => (
								<li
									key={customer.id}
									className="py-6 px-4 bg-gray-700 rounded-lg mb-4 shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center"
								>
									<div>
										<p>
											<strong className="text-indigo-400">Name:</strong>{" "}
											{customer.name}
										</p>
										<p>
											<strong className="text-indigo-400">Phone:</strong>{" "}
											{customer.phone}
										</p>
										<p>
											<strong className="text-indigo-400">Email:</strong>{" "}
											{customer.email}
										</p>
										<p>
											<strong className="text-indigo-400">Address:</strong>{" "}
											{customer.address}
										</p>
									</div>
									<button
										onClick={() => deleteCustomer(customer.id)}
										className="mt-4 sm:mt-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
									>
										Delete
									</button>
								</li>
							))}
						</ul>
					) : (
						<p className="text-gray-400 text-center">
							No customers available. Add a new customer above.
						</p>
					)}
				</div>
			</div>

			<footer className="mt-16 text-gray-400">
				© 2024 Car Showroom Management System. All Rights Reserved.
			</footer>
		</div>
	);
};

export default CustomerManagement;
