import { IQuiz } from "../quiz/index.type";
import { IUser } from "../user/index.type";

export interface IQuizComments {
    _id?: string;
    author?: IUser;
    quiz?: IQuiz;
    comment?: string;
    commentDate?: Date;
    updatedAt?: Date;
    quizSegmentIndex?: number;
}

export interface IGetQuizParams {
    quizId: string;
    quizSegmentIndex: number;
}