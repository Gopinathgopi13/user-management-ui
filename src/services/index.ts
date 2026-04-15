import axios from "axios";
import { getCookie } from "../utilities/auth";
import { ACCESS_TOKEN } from "../utilities/constant";

const baseURL = import.meta.env.VITE_HOST_URL;

export const instance = axios.create({
    baseURL: `${baseURL}/api`,
});

instance.interceptors.request.use((config) => {
    const token = getCookie(ACCESS_TOKEN);
    if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
});

