"use client";

import { useState } from "react";

export default function Component() {
	const [image, setImage] = useState(null);
	const [objects, setObjects] = useState([]);
	const handleImageUpload = (e) => {
		setImage(e.target.files[0]);
	};
	const processImage = async () => {
		try {
			const formData = new FormData();
			formData.append("image", image);
			const response = await fetch("YOUR_API_URL", {
				method: "POST",
				body: formData,
			});
			const data = await response.json();
			setObjects(data.objects);
		} catch (error) {
			console.error("Error processing image:", error);
		}
	};
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
			<div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
				<h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Object Detection Report</h1>
				<div className="mb-4">
					<label htmlFor="image" className="block text-gray-700 dark:text-gray-400 font-medium mb-2">
						Upload Image
					</label>
					<input
						type="file"
						id="image"
						accept="image/*"
						onChange={handleImageUpload}
						className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
					/>
				</div>
				<button
					onClick={processImage}
					className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-md w-full"
				>
					Process Image
				</button>
				{objects.length > 0 && (
					<div className="mt-8">
						<h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Object Detection Report</h2>
						<div className="overflow-auto max-h-[300px]">
							<table className="w-full table-auto">
								<thead>
									<tr className="bg-gray-200 dark:bg-gray-700">
										<th className="px-4 py-2 text-left text-gray-700 dark:text-gray-400">Object</th>
										<th className="px-4 py-2 text-left text-gray-700 dark:text-gray-400">X</th>
										<th className="px-4 py-2 text-left text-gray-700 dark:text-gray-400">Y</th>
										<th className="px-4 py-2 text-left text-gray-700 dark:text-gray-400">Width</th>
										<th className="px-4 py-2 text-left text-gray-700 dark:text-gray-400">Height</th>
									</tr>
								</thead>
								<tbody>
									{objects.map((obj, index) => (
										<tr
											key={index}
											className={`border-b dark:border-gray-600 ${
												index % 2 === 0 ? "bg-gray-100 dark:bg-gray-800" : "bg-white dark:bg-gray-900"
											}`}
										>
											<td className="px-4 py-2 text-gray-900 dark:text-gray-100">{obj.label}</td>
											<td className="px-4 py-2 text-gray-900 dark:text-gray-100">{obj.x}</td>
											<td className="px-4 py-2 text-gray-900 dark:text-gray-100">{obj.y}</td>
											<td className="px-4 py-2 text-gray-900 dark:text-gray-100">{obj.width}</td>
											<td className="px-4 py-2 text-gray-900 dark:text-gray-100">{obj.height}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
