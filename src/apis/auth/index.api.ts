import Axios_instance from "@/axios/config";
import { IAuthValues } from "@/types/auth/index.type";

const url = "/auth/login";
const userUrl = "/user";

export const AuthApis = {
    login: async (values: IAuthValues) => {
        const response = await Axios_instance.post(url, values);

        return response.data || {};
    },
    register: async (values: IAuthValues) => {
        const response = await Axios_instance.post(userUrl, values);

        return response.data || {};
    },
}

export const getAccessToken = () => {
    if (typeof window === "undefined") {
        return "";
    }

    const token = localStorage.getItem("AccessToken");

    return token;
}