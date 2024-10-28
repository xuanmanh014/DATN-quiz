import { IQuiz } from "../quiz/index.type";
import { IUser } from "../user/index.type";

export interface IFavQuiz {
    _id?: string
    user?: IUser
    quiz?: IQuiz
}