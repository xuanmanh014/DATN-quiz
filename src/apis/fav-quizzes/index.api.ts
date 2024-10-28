import { IFavQuiz } from "@/types/fav-quizzes/index.type";
import Axios_instance from "../../axios/config";

const url = "/favourite-quiz";

export const FavQuizApis = {
    getAll: async (userId?: string) => {
        const response = await Axios_instance.get(`${url}/${userId}/by-user`);

        return response.data || [];
    },
    getByQuizId: async (quizId?: string) => {
        const response = await Axios_instance.get(`${url}/${quizId}/by-quiz`);

        return response.data || {};
    },
    addFavQuiz: async (values?: IFavQuiz) => {
        const response = await Axios_instance.post(url, values);

        return response.data || {};
    },
    removeFavQuiz: async (id?: string) => {
        const response = await Axios_instance.delete(`${url}/${id}`);

        return response.data || {};
    },
}