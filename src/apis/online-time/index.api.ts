import Axios_instance from '@/axios/config';

const url = "/online-time";

export const OnlineTimeApis = {
    getAllOnlineUser: async () => {
        const response = await Axios_instance.get(url);

        return response.data;
    },
    getTotalOnlineTimeOfDay: async (userId?: string) => {
        const response = await Axios_instance.get(`${url}/${userId}`);

        return response.data || {};
    }
}
