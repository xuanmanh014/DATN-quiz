"use client";

import { getMe } from '@/apis/auth/index.api';
import { FavQuizApis } from '@/apis/fav-quizzes/index.api';
import { Separator } from '@/components/ui/separator';
import { useAppContext } from '@/contexts/app';
import { IFavQuiz } from '@/types/fav-quizzes/index.type';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const FavouriteLessionsPage = () => {
    const tokenDecoded = getMe();
    const [quizzes, setQuizzes] = useState<IFavQuiz[]>([]);
    const { openNotiError } = useAppContext();

    useEffect(() => {
        FavQuizApis.getAll(tokenDecoded?._id).then(response => {
            setQuizzes(response?.data);
        }).catch(error => {
            const { response } = error;
            openNotiError("Get favourite quizzes", response?.data?.message);
        })
    }, [])

    return (
        <div>
            <h1 className='text-[30px] font-medium'>Favourite lessions</h1>
            <Separator className='my-4' />
            {quizzes.length > 0 ? <table className='border-collapse border border-gray-300 w-full'>
                <tbody>
                    {quizzes.map(quiz => {
                        const exerciseKey = quiz?.quiz?.quizTopic?.topicName?.toLowerCase().split(" ").join("-");

                        return (
                            <tr key={quiz._id}>
                                <td className='text-blue-500 underline cursor-pointer p-3 border'>
                                    <Link href={`/exercises/${exerciseKey}/${quiz.quiz?._id}`} className='block'>{quiz.quiz?.quizName}</Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table> : <p>You don't have any favourite lessons yet.</p>}
        </div>
    )
}

export default FavouriteLessionsPage