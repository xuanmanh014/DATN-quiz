import Axios_instance from "@/axios/config";
import { IAuthValues } from "@/types/auth/index.type";
import { ITokenDecoded } from "@/types/common/index.type";
import { jwtDecode } from "jwt-decode";

const authUrl = "/auth";
const userUrl = "/user";

export const AuthApis = {
    login: async (values: IAuthValues) => {
        const response = await Axios_instance.post(`${authUrl}/login`, values);

        return response.data || {};
    },
    register: async (values: IAuthValues) => {
        const response = await Axios_instance.post(userUrl, values);

        return response.data || {};
    },
    forgotPassword: async (values: IAuthValues) => {
        const response = await Axios_instance.post(`${authUrl}/forgot-password`, values);

        return response.data || {};
    }
}

export const getAccessToken = () => {
    if (typeof window === "undefined") {
        return "";
    }

    const token = window.localStorage.getItem("AccessToken");

    return token;
}

export const getMe = () => {
    try {
        const accessToken = getAccessToken() || "";

        if (!accessToken) {
            return null;
        }

        const tokenDecoded = jwtDecode(accessToken);

        return tokenDecoded as ITokenDecoded
    } catch (error) {
        console.log(error);
    }
}