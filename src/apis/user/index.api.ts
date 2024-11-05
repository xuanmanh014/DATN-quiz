import { IProfileUpdate, IUser } from "@/types/user/index.type";
import Axios_instance from "../../axios/config";

const url = "/user";

export const UserApis = {
    getAll: async () => {
        const response = await Axios_instance.get(url);

        return response.data || [];
    },
    getById: async (id?: string) => {
        const response = await Axios_instance.get(`${url}/${id}`);

        return response.data || {};
    },
    updateUser: async (id?: string, values?: IProfileUpdate) => {
        const response = await Axios_instance.put(`${url}/${id}`, values);

        return response.data || {};
    },
}