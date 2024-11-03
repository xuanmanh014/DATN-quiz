import { IQuiz } from "../quiz/index.type"

export interface ITokenDecoded {
    _id?: string
    email?: string
    roles?: string[]
    userFullName?: string
    phoneNumber?: string
}

export interface IFile {
    _id?: string
    fileName?: string
    filePath?: string
    fileSize?: number
    fileType?: string
}

export interface IQuizByTopic {
    topic?: string
    quizzes?: IQuiz[]
}

export interface IGetDto {
    search?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
}