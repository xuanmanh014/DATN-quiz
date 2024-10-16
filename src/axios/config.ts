import { getAccessToken } from "@/apis/auth/index.api";
import axios from "axios";

const Axios_instance = axios.create({
    baseURL: `http://localhost:3000/api/v1`,
    headers: {
        "content-Type": "application/json",
    },
});

Axios_instance.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            const { url } = error.response?.config;
            if (error.response.status === 403 && url !== "/auth/login") {
                if (typeof window !== "undefined") {
                    window.location.href = "/error/403";
                }
            } else if (error.response.status === 401 && url !== "/auth/login") {
                if (typeof window !== "undefined") {
                    window.localStorage.clear();
                }
            }
        }

        return Promise.reject(error);
    }
);

Axios_instance.interceptors.request.use((config) => {
    config.headers["Authorization"] = `Bearer ${getAccessToken()}`;

    return config;
});

export default Axios_instance;