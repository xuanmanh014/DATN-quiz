import Axios_instance from "@/axios/config";
import { IFlashCard, IFlashCardList } from "@/types/flash-card/index.type";

const listUrl = "/flash-card-list";
const cardUrl = "/flash-card";

export const ListFlashCardApis = {
    getAll: async () => {
        const response = await Axios_instance.get(listUrl);

        return response?.data || [];
    },
    create: async (values: IFlashCardList) => {
        const response = await Axios_instance.post(listUrl, values);

        return response?.data || {};
    },
}

export const FlashCardApis = {
    getAll: async () => {
        const response = await Axios_instance.get(cardUrl);

        return response?.data || [];
    },
    create: async (values: IFlashCard) => {
        const response = await Axios_instance.post(cardUrl, values);

        return response?.data || {};
    },
}