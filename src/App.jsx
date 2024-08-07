import { useState } from "react";
import FileInput from "./components/FileInput";

/* eslint-disable react/no-unknown-property */
function App() {
	const [generate, setGenerate] = useState(false);
	const handleButtonClick = () => {
		fetch("https://backend-hosho-digital.onrender.com/api/v1/generate-team", {
			method: "GET",
			headers: {
				"Content-Type": "application/pdf",
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.blob();
			})
			.then((blob) => {
				const url = window.URL.createObjectURL(blob);
				const link = document.createElement("a");
				link.href = url;
				link.setAttribute("download", "output.pdf"); // Name the downloaded file
				document.body.appendChild(link);
				link.click();
				link.remove();
			})
			.catch((error) => {
				console.error("Error downloading file:", error);
			});
	};
	return (
		<div className='bg-slate-800 h-[100vh] w-[100hw]'>
			<div className='h-[100%] w-[100%] flex justify-center items-center flex-col gap-2'>
				<p className='text-sky-200 w-[80%] text-center font-bold text-3xl'>
					<span className='text-indigo-400'>Hello!! </span>Welcome to
					the application to generate a team!!
				</p>

				{!generate && <FileInput setGenerate={setGenerate} />}

				{generate && (
					<button
						className='block cursor-pointer bg-blue-500 text-white text-center py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 mt-4'
						onClick={handleButtonClick}
					>
						Generate a team (please click a few times)
					</button>
				)}
			</div>
		</div>
	);
}

export default App;
