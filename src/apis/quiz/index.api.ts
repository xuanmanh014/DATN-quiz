import Axios_instance from "../../axios/config";
import { IQuiz } from "../../types/quiz/index.type";

const url = "/quiz";

export const QuizApis = {
    getAll: async () => {
        const response = await Axios_instance.get(url);

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
    checkQuizAnswer: async (id?: string, segmentIndex?: number, answer?: string) => {
        const response = await Axios_instance.post(`${url}/${id}/answer-full`, { answer });

        return response.data || {};
    },
}