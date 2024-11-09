"use client"

import { getMe } from '@/apis/auth/index.api';
import { QuizCommentsApis } from '@/apis/quiz-comments/index.api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useAppContext } from '@/contexts/app';
import { IQuizComments } from '@/types/quiz-comments/index.type';
import { useParams } from 'next/navigation';
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { AiOutlineSend } from "react-icons/ai";
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constant/constants';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import { IoIosMore } from "react-icons/io";
import ConfirmDelete from '@/components/pages/confirm/Delete';

interface IQuizCommentsProps {
    segmentIndex: number
}

interface ICommentUpdate {
    isUpdate: boolean,
    commentData?: IQuizComments
}

const QuizComments: FC<IQuizCommentsProps> = ({ segmentIndex }) => {
    const params = useParams<{ id: string }>();
    const [quizComments, setQuizComments] = useState<IQuizComments[]>([]);
    const { openNotiError } = useAppContext();
    const tokenDecoded = getMe();
    const [comment, setComment] = useState("");
    const [commentUpdate, setCommentUpdate] = useState<ICommentUpdate>({
        isUpdate: false,
        commentData: {}
    });

    const getData = () => {
        const quizParams = {
            quizId: params.id,
            quizSegmentIndex: segmentIndex
        }

        QuizCommentsApis.getByQuiz(quizParams).then(response => {
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
            quiz: params.id,
            quizSegmentIndex: segmentIndex
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

    const handleUpdateComment = () => {
        const data = {
            author: tokenDecoded?._id,
            comment: commentUpdate.commentData?.comment,
            quiz: params.id,
            quizSegmentIndex: segmentIndex
        } as IQuizComments

        QuizCommentsApis.update(commentUpdate.commentData?._id, data).then(() => {
            setCommentUpdate({
                isUpdate: false,
                commentData: {}
            });
            getData();
        }).catch(() => {
        });
    }

    const handleCancelUpdate = () => {
        setCommentUpdate({
            isUpdate: false,
            commentData: {}
        });
    }

    useEffect(() => {
        getData();
    }, [params.id, segmentIndex]);

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
                    commentUpdate.isUpdate
                        ? <div className="flex items-center gap-3">
                            <Input value={commentUpdate.commentData?.comment} onChange={(e) => setCommentUpdate({
                                ...commentUpdate,
                                commentData: {
                                    ...commentUpdate.commentData,
                                    comment: e.target.value
                                }
                            })} />
                            <Button
                                variant={"outline"}
                                className='rounded-full'
                                onClick={handleCancelUpdate}
                            >
                                Cancel
                            </Button>
                            <Button
                                className='rounded-full'
                                onClick={handleUpdateComment}
                                disabled={comment.comment === commentUpdate.commentData?.comment}
                            >
                                Update
                            </Button>
                        </div>
                        : <div key={comment._id}>
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-3">
                                    <h4 className='font-medium'>{comment.author?.firstName} {comment.author?.lastName}</h4>
                                    <p className='text-[13px] text-gray-400'>{dayjs(comment.commentDate).format(DATE_FORMAT)}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-8">
                                <p className='text-gray-400'>{comment.comment}</p>
                                <MoreActions comment={comment} refetchData={getData} setCommentUpdate={setCommentUpdate} />
                            </div>
                        </div>
                );
            })}
        </div>
    )
}

const MoreActions = ({ comment, refetchData, setCommentUpdate }: { comment?: IQuizComments, refetchData: () => void, setCommentUpdate: Dispatch<SetStateAction<ICommentUpdate>> }) => {
    const menu = [
        { label: "Edit", key: "edit" },
        { label: "Delete", key: "delete" },
    ];
    const [openDelete, setOpenDelete] = useState(false);

    const handleDeleteComment = () => {
        if (comment?._id) {
            QuizCommentsApis.delete(comment._id).then(() => {
                refetchData();
            }).catch(() => {
            }).finally(() => {
                setOpenDelete(false);
            });
        }
    }

    const handleClick = (key: string) => {
        switch (key) {
            case "delete":
                setOpenDelete(true);
                break;
            case "edit":
                setCommentUpdate({
                    isUpdate: true,
                    commentData: comment
                });
                break;
            default:
                break;
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <IoIosMore className='text-[16px]' />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {menu.map(item => {
                        return (
                            <DropdownMenuLabel key={item.key} className='p-2 cursor-pointer hover:bg-gray-100 transition-all' onClick={() => handleClick(item.key)}>{item.label}</DropdownMenuLabel>
                        )
                    })}
                </DropdownMenuContent>
            </DropdownMenu>

            <ConfirmDelete
                open={openDelete}
                setOpen={setOpenDelete}
                onOk={handleDeleteComment}
            />
        </>
    )
}

export default QuizComments