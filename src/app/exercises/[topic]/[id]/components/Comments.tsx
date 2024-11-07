"use client"

import { getMe } from '@/apis/auth/index.api';
import { QuizCommentsApis } from '@/apis/quiz-comments/index.api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useAppContext } from '@/contexts/app';
import { IQuizComments } from '@/types/quiz-comments/index.type';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { AiOutlineSend } from "react-icons/ai";
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constant/constants';

const QuizComments = () => {
    const params = useParams<{ id: string }>();
    const [quizComments, setQuizComments] = useState<IQuizComments[]>([]);
    const { openNotiError } = useAppContext();
    const tokenDecoded = getMe();
    const [comment, setComment] = useState("");

    const getData = () => {
        QuizCommentsApis.getByQuiz(params.id).then(response => {
            setQuizComments(response?.data);
        }).catch(error => {
            const { response } = error;
            openNotiError("Get comment by quiz", response?.data?.message);
        });
    }

    const handleComment = () => {
        const values = {
            author: tokenDecoded?._id,
            comment,
            quiz: params.id
        } as IQuizComments;

        if (!values.comment) {
            openNotiError("Comment", "Please type your comment!");
            return;
        }

        QuizCommentsApis.create(values).then(response => {
            getData();
            setComment("");
        }).catch(error => {
            const { response } = error;
            openNotiError("Create comment", response?.data?.message);
        });
    }

    useEffect(() => {
        getData();
    }, [params.id]);

    return (
        <div className='border border-gray-300 rounded-lg p-4'>
            <h3 className='mb-4'>Comments</h3>

            <div className="flex items-center gap-3">
                <Input value={comment} onChange={(e) => setComment(e.target.value)} />
                <Button
                    variant={"outline"}
                    className='rounded-full'
                    onClick={handleComment}
                    disabled={!comment}
                >
                    <AiOutlineSend />
                </Button>
            </div>
            <Separator className='my-5' />
            {quizComments.map(comment => {
                return (
                    <div key={comment._id} className='flex items-center gap-2 mb-8'>
                        <div>
                            <div className="flex items-center gap-3">
                                <h4 className='font-medium'>{comment.author?.firstName} {comment.author?.lastName}</h4>
                                <p className='text-[13px] text-gray-400'>{dayjs(comment.commentDate).format(DATE_FORMAT)}</p>
                            </div>
                            <p className='text-gray-400'>{comment.comment}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default QuizComments