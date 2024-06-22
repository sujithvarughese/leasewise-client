// axios
import axios from "axios";
import { config } from "./constants.js";

const axiosHUD = axios.create({
	baseURL: import.meta.env.VITE_HUD_URL,
	headers : {
		Authorization : `Bearer ${import.meta.env.VITE_HUD_TOKEN}`
	}
});
// response
axiosHUD.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		// console.log(error.response)
		return Promise.reject(error);
	}
);

const axiosDB = axios.create({
	baseURL: config.url.API_URL,
	withCredentials: true
});
// response
axiosDB.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		// console.log(error.response)
		return Promise.reject(error);
	}
);

export { axiosHUD, axiosDB };
