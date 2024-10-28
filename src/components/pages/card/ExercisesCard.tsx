import { Separator } from '@/components/ui/separator'
import { IQuizByTopic } from '@/types/common/index.type'
import { quizOrQuizzes } from '@/utils/utils'
import Link from 'next/link'
import React, { FC } from 'react'

interface IExercisesCardProps {
    exercise?: IQuizByTopic
}

const ExercisesCard: FC<IExercisesCardProps> = ({ exercise }) => {
    const exerciseKey = exercise?.topic?.toLowerCase().split(" ").join("-");

    return (
        <div className='border border-gray-300 px-5 py-3 rounded-lg'>
            <h3 className='text-[30px] text-blue-500 flex items-center gap-2'>
                <Link href={`/exercises/${exerciseKey}`} className='underline'>
                    {exercise?.topic}
                </Link>
                <p className='text-[20px]'>{`(${exercise?.quizzes?.length} ${quizOrQuizzes(Number(exercise?.quizzes?.length))})`}</p>
            </h3>
            <Separator className='my-3' />

            <ul className='px-6'>
                {exercise?.quizzes?.slice(0, 4)?.map((quiz, index) => {
                    return (
                        <li key={quiz._id} className='list-disc py-2'>
                            <Link href={`/exercises/${exerciseKey}/${quiz._id}`} className='underline text-blue-500'>{index + 1}. {quiz.quizName}</Link>
                        </li>
                    )
                })}
            </ul>

            <Link href={`/exercises/${exerciseKey}`} className='underline text-blue-500 inline-block mt-3'>View all</Link>
        </div>
    )
}

export default ExercisesCard