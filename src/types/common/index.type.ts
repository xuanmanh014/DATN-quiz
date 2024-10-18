import { IQuiz } from "../quiz/index.type"

export interface ITokenDecoded {
    _id?: string,
    email?: string,
    role?: string[],
    userFullName?: string,
    phoneNumber?: string,
}

export interface IFile {
    _id?: string
    fileName?: string
    filePath?: string
    fileSize?: number
    fileType?: string
}

export interface IQuizByTopic {
    topic?: string;
    quizzes?: IQuiz[]
}