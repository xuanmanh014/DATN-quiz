import { IQuiz } from "../quiz/index.type";
import { IUser } from "../user/index.type";

export interface IQuizComments {
    _id?: string;
    author?: IUser;
    quiz?: IQuiz;
    comment?: string;
    commentDate?: Date;
    updatedAt?: Date;
}