import { IGetDto } from "@/types/common/index.type";
import Axios_instance from "../../axios/config";

const url = "/topic";

export const TopicApis = {
    getAll: async (query?: IGetDto) => {
        const response = await Axios_instance.get(url, { params: query });

        return response.data || [];
    },
}