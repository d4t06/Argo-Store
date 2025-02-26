import axios from "axios";

const BASE_URL =
	process.env.EXPO_PUBLIC_API_ENDPOINT ||
	"https://argo-store-nest.vercel.app/api";

export const publicRequest = axios.create({
	baseURL: BASE_URL,
});
