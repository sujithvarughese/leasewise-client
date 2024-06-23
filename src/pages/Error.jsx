import { useRouteError } from "react-router-dom";

// router will route here if page doesn't exist or not found
const Error = () => {
	// router function to display error
	const error = useRouteError()
	console.log(error);

	return (
		<div>
			<h2>{error.status} - {error.statusText}</h2>
			<h4>{error.data}</h4>
		</div>
	);
};

export default Error;