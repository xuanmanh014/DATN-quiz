import { IFile } from "../common/index.type"
import { ITopic } from "../topic/index.type"

export interface ISegment {
    startTime: number
    endTime: number
    answer: string
}

export interface IAnswerResponse {
    isCorrect?: boolean
    success?: boolean
    answer?: string
    isSkip?: boolean
}

export interface IQuiz {
    _id?: string
    quizName?: string
    quizScore?: number
    quizRecord?: IFile
    quizAnswer?: string
    quizType?: string
    quizTopic?: ITopic
    isSegmented?: boolean
    segments?: ISegment[]
}