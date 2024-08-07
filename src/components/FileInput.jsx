/* eslint-disable react/prop-types */
import { useState } from "react";

const FileInput = ({ setGenerate }) => {
	const [file, setFile] = useState(null);
	const [fileName, setFileName] = useState("");

	const handleFileChange = (event) => {
		const selectedFile = event.target.files[0];
		if (selectedFile) {
			setFile(selectedFile);
			setFileName(selectedFile.name);
		} else {
			setFile(null);
			setFileName("");
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (!file) {
			alert("Please select a file.");
			return;
		}

		// Form data to send file
		const formData = new FormData();
		formData.append("file", file);

		// Example of handling the file upload
		fetch("https://backend-hosho-digital.onrender.com/api/v1/upload", {
			// Adjust URL as needed
			method: "POST",
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				// alert('File uploaded successfully!');
				console.log("Upload success:", data);
				setGenerate(true); // Trigger state change to generate team
			})
			.catch((error) => {
				// alert('Error uploading file.');
				console.error("Upload error:", error);
			});
	};

	return (
		<div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto mt-10'>
			<h2 className='text-2xl font-semibold mb-4'>Upload File</h2>
			<form onSubmit={handleSubmit}>
				<label
					htmlFor='file-upload'
					className='block text-gray-700 font-medium mb-2'
				>
					Choose a CSV file only
				</label>
				<div className='relative mb-4'>
					<input
						type='file'
						id='file-upload'
						className='sr-only'
						onChange={handleFileChange}
					/>
					<label
						htmlFor='file-upload'
						className='block cursor-pointer bg-blue-500 text-white text-center py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300'
					>
						<span>{fileName || "Select a file"}</span>
					</label>
				</div>
				<button
					type='submit'
					className='bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300'
				>
					Upload
				</button>
			</form>
		</div>
	);
};

export default FileInput;

// 	const handleFileChange = (event) => {
// 		const file = event.target.files[0];
// 		if (file) {
// 			console.log(`Selected file: ${file.name}`);
// 		}
// 	};

//     const [file, setFile] = useState("");

// 	return (
// 		<div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto mt-10'>
// 			<h2 className='text-2xl font-semibold mb-4'>Upload a CSV File</h2>
// 			<form>
// 				<div className='relative'>
// 					<input
// 						type='file'
// 						id='file-upload'
// 						className='sr-only'
// 						onChange={handleFileChange}
// 					/>
// 					<label
// 						htmlFor='file-upload'
// 						className='block cursor-pointer bg-blue-500 text-white text-center py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300'
// 					>
// 						<span>Select a file</span>
// 						<svg
// 							xmlns='http://www.w3.org/2000/svg'
// 							className='w-5 h-5 inline-block ml-2'
// 							fill='none'
// 							viewBox='0 0 24 24'
// 							stroke='currentColor'
// 						>
// 							<path
// 								strokeLinecap='round'
// 								strokeLinejoin='round'
// 								strokeWidth='2'
// 								d='M17 16l4-4m0 0l-4-4m4 4H3'
// 							/>
// 						</svg>
// 					</label>
// 				</div>
// 			</form>
// 		</div>
// 	);
// };

// export default FileInput;
