import { QuizApis } from '@/apis/quiz/index.api';
import ExercisesCard from '@/components/pages/card/ExercisesCard';
import { Separator } from '@/components/ui/separator';
import { IQuizByTopic } from '@/types/common/index.type';
import { IQuiz } from '@/types/quiz/index.type';
import React from 'react'

const fetchQuizzes = async () => {
    const response = await QuizApis.getAll();

    return response.data.data || [];
}

const ExercisesPage = async () => {
    const quizzes: IQuiz[] = await fetchQuizzes();
    const quizzesTransformed = quizzes.reduce((acc, current) => {
        const existingTopic = acc.find(item => item.topic === current.quizTopic?.topicName);

        if (existingTopic) {
            existingTopic.quizzes?.push(current);
        } else {
            acc.push({
                topic: current.quizTopic?.topicName,
                quizzes: [current]
            });
        }

        return acc;
    }, [] as IQuizByTopic[]);

    return (
        <div>
            <h1 className='text-[30px] font-bold'>All topics</h1>

            <Separator className='mt-4 mb-[50px]' />

            <div className="grid grid-cols-2 gap-6">
                {quizzesTransformed.map(item => {
                    return (
                        <div key={item.topic} className="col-span-1">
                            <ExercisesCard exercise={item} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ExercisesPage