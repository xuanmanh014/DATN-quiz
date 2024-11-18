import { QuizApis } from '@/apis/quiz/index.api';
import { TopicApis } from '@/apis/topic/index.api';
import TopicCard from '@/components/pages/card/TopicCard';
import { Separator } from '@/components/ui/separator';
import { IQuizByTopic } from '@/types/common/index.type';
import { IQuiz } from '@/types/quiz/index.type';
import { ITopic } from '@/types/topic/index.type';
import React from 'react'

const fetchQuizzes = async () => {
    const response = await QuizApis.getAll();

    return response.data.data || [];
}

const fetchTopic = async () => {
    const response = await TopicApis.getAll();

    return response.data.data || [];
}

const ExercisesPage = async () => {
    const quizzes: IQuiz[] = await fetchQuizzes();
    const topics: ITopic[] = await fetchTopic();
    const quizzesByTopic: IQuizByTopic[] = topics.map(topic => {
        const topicQuizzes = quizzes.filter(quiz => quiz.quizTopic?._id === topic._id);
        return {
            topic: topic,
            quizzes: topicQuizzes
        };
    });

    return (
        <div>
            <h1 className='text-[30px] font-bold'>All topics</h1>

            <Separator className='mt-4 mb-[50px]' />

            <div className="grid grid-cols-3 gap-6">
                {quizzesByTopic.map(item => {
                    return (
                        <div key={item.topic?._id} className="col-span-1">
                            <TopicCard topic={item} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ExercisesPage