import { IGetDto } from "@/types/common/index.type";
import Axios_instance from "../../axios/config";

const url = "/quiz";

export const QuizApis = {
    getAll: async (query?: IGetDto) => {
        const response = await Axios_instance.get(url, { params: query });

        return response.data || [];
    },
    getById: async (id?: string) => {
        const response = await Axios_instance.get(`${url}/${id}`);

        return response.data || {};
    },
    checkSegmentAnswer: async (id?: string, segmentIndex?: number, answer?: string) => {
        const response = await Axios_instance.post(`${url}/${id}/answer-segment`, { segmentIndex, answer });

        return response.data || {};
    },
    checkQuizAnswer: async (id?: string, answer?: string) => {
        const response = await Axios_instance.post(`${url}/${id}/answer-full`, { answer });

        return response.data || {};
    },
    getByTopic: async (topic?: string, query?: IGetDto) => {
        const response = await Axios_instance.get(`${url}/by-topic/${topic}`, { params: query });

        return response.data.data || [];
    },
}