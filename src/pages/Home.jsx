import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-center">
			<header className="mb-16 text-center">
				<h1 className="text-5xl font-extrabold mb-4 text-indigo-400">
					Car Showroom Management System
				</h1>
				<p className="text-lg text-gray-300">
					Manage cars, customers, and sales seamlessly with our system!
				</p>
			</header>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl px-4">
				<Link
					to="/cars"
					className="bg-blue-500 hover:bg-blue-600 transition transform hover:scale-105 text-white font-semibold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center"
				>
					Manage Cars 🚗
				</Link>
				<Link
					to="/customers"
					className="bg-green-500 hover:bg-green-600 transition transform hover:scale-105 text-white font-semibold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center"
				>
					Manage Customers 👥
				</Link>
				<Link
					to="/sales"
					className="bg-purple-500 hover:bg-purple-600 transition transform hover:scale-105 text-white font-semibold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center"
				>
					Manage Sales 💸
				</Link>
			</div>

			<footer className="mt-16 text-gray-400">
				© 2024 Car Showroom Management System. All Rights Reserved.
			</footer>
		</div>
	);
};

export default Home;
