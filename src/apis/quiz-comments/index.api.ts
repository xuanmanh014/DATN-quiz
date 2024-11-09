import Axios_instance from "../../axios/config";
import { IGetQuizParams, IQuizComments } from "@/types/quiz-comments/index.type";

const url = "/quiz-comments";

export const QuizCommentsApis = {
    getByQuiz: async (params?: IGetQuizParams) => {
        const response = await Axios_instance.post(`${url}/by-quiz-and-segment`, params);

        return response.data || [];
    },
    create: async (values: IQuizComments) => {
        const response = await Axios_instance.post(url, values);

        return response?.data || {};
    },
    update: async (id?: string, values?: IQuizComments) => {
        const response = await Axios_instance.patch(`${url}/${id}`, values);

        return response?.data || {};
    },
    delete: async (id: string) => {
        const response = await Axios_instance.delete(`${url}/${id}`);

        return response?.data || {};
    },
}