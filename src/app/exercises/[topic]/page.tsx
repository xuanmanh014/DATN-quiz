import { QuizApis } from '@/apis/quiz/index.api';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { IQuiz } from '@/types/quiz/index.type';
import Link from 'next/link';
import React from 'react'

const fetchQuizzes = async (topic: string) => {
    const response = await QuizApis.getByTopic(topic);

    return response.data || [];
}

const ExercisesByTopicPage = async ({ params }: { params: { topic: string } }) => {
    const { topic } = params;
    const quizzes: IQuiz[] = await fetchQuizzes(topic);

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className='text-[30px] font-bold'>{quizzes[0].quizTopic?.topicName}</h1>
                <Input className='w-[500px]' placeholder='Search quiz here' />
            </div>
            <Separator className='my-10' />

            <div className="grid grid-cols-3 gap-4">
                {quizzes.map((quiz, index) => {
                    return (
                        <Link href={`/exercises/${topic}/${quiz._id}`} key={quiz._id} className="col-span-1 text-blue-500 underline block p-4 border border-gray-200 rounded-lg">
                            {index + 1}. {quiz.quizName}
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default ExercisesByTopicPage