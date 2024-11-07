import Axios_instance from "../../axios/config";
import { IQuizComments } from "@/types/quiz-comments/index.type";

const url = "/quiz-comments";

export const QuizCommentsApis = {
    getByQuiz: async (quizId?: string) => {
        const response = await Axios_instance.get(`${url}/by-quiz/${quizId}`);

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