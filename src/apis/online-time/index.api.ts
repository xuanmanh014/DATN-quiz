import Axios_instance from '@/axios/config';
import axios from 'axios';

const url = "/online-time";

export const OnlineTimeApis = {
    getAllOnlineUser: async () => {
        const response = await Axios_instance.get(url);

        return response.data;
    },
}
