import React, { useState, useEffect } from "react";
import axios from "axios";

const CarManagement = () => {
	const [cars, setCars] = useState([]);
	const [newCar, setNewCar] = useState({ model: "", brand: "", price: "" });

	// Fetch all cars
	const fetchCars = async () => {
		try {
			const response = await axios.get("http://localhost:5000/api/cars");
			setCars(response.data);
		} catch (error) {
			console.error("Error fetching cars:", error);
		}
	};

	// Add a new car
	const addCar = async () => {
		try {
			await axios.post("http://localhost:5000/api/cars", newCar);
			fetchCars();
			setNewCar({ model: "", brand: "", price: "" });
		} catch (error) {
			console.error("Error adding car:", error);
		}
	};

	// Delete a car
	const deleteCar = async (id) => {
		try {
			await axios.delete(`http://localhost:5000/api/cars/${id}`);
			fetchCars();
		} catch (error) {
			console.error("Error deleting car:", error);
		}
	};

	useEffect(() => {
		fetchCars();
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-8 px-4">
			<div className="max-w-4xl mx-auto bg-gray-800 shadow-lg rounded-xl p-8">
				<h1 className="text-4xl font-bold text-center text-indigo-400 mb-6">
					Car Management
				</h1>

				{/* Add a New Car */}
				<form action="">
					<div className="mb-8">
						<h2 className="text-2xl font-semibold mb-4 text-gray-200">
							Add a New Car
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
							<input
								type="text"
								required
								placeholder="Brand"
								value={newCar.brand}
								onChange={(e) =>
									setNewCar({ ...newCar, brand: e.target.value })
								}
								className="bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
							/>
							<input
								type="text"
								placeholder="Model"
								value={newCar.model}
								required
								onChange={(e) =>
									setNewCar({ ...newCar, model: e.target.value })
								}
								className="bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
							/>
							<input
								type="number"
								placeholder="Price"
								required
								value={newCar.price}
								onChange={(e) =>
									setNewCar({ ...newCar, price: e.target.value })
								}
								className="bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
							/>
						</div>
						<button
							onClick={addCar}
							type="submit"
							className="mt-4 w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
						>
							Add Car
						</button>
					</div>
				</form>

				{/* List of Cars */}
				<div>
					<h2 className="text-2xl font-semibold mb-4 text-gray-200">
						Car List
					</h2>
					{cars.length > 0 ? (
						<ul className="space-y-4">
							{cars.map((car) => (
								<li
									key={car.id}
									className="flex justify-between items-center bg-gray-700 p-4 rounded-lg shadow-sm"
								>
									<div className="text-gray-300">
										<span className="block">
											<strong>Model:</strong> {car.model}
										</span>
										<span className="block">
											<strong>Brand:</strong> {car.brand}
										</span>
										<span className="block">
											<strong>Price:</strong> ${car.price}
										</span>
									</div>
									<button
										onClick={() => deleteCar(car.id)}
										className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
									>
										Delete
									</button>
								</li>
							))}
						</ul>
					) : (
						<p className="text-gray-400 text-center">No cars available.</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default CarManagement;
