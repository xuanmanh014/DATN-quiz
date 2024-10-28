"use client"

import React, { FC, useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IoIosMore } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { useParams } from 'next/navigation';
import { FavQuizApis } from '@/apis/fav-quizzes/index.api';
import { getMe } from '@/apis/auth/index.api';
import { IFavQuiz } from '@/types/fav-quizzes/index.type';

interface IMoreActionsProps {
}

const MoreActions: FC<IMoreActionsProps> = ({ }) => {
    const tokenDecoded = getMe();
    const params = useParams<{ id: string }>();
    const [favQuiz, setIsFavQuiz] = useState<IFavQuiz>();
    const actions = [
        { label: favQuiz?._id ? "Remove from favourite lession list" : "Add to favourite lession list", key: favQuiz?._id ? "removeFavLession" : "addFavLession", icon: favQuiz?._id ? <FaHeart /> : <FiHeart /> }
    ];

    useEffect(() => {
        FavQuizApis.getByQuizId(params.id).then(response => {
            setIsFavQuiz(response.data);
        });
    }, [params.id])

    const handleAddFavQuiz = () => {
        const data = { user: tokenDecoded?._id, quiz: params.id } as IFavQuiz;
        FavQuizApis.addFavQuiz(data).then(response => {
            setIsFavQuiz(response.data);
        });
    }

    const handleRemoveFavQuiz = () => {
        FavQuizApis.removeFavQuiz(favQuiz?._id).then(() => {
            setIsFavQuiz({});
        });
    }

    const handleClickItem = (key: string) => {
        switch (key) {
            case "addFavLession":
                handleAddFavQuiz();
                break;
            case "removeFavLession":
                handleRemoveFavQuiz();
                break;
            default:
                break;
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className='border border-gray-300 p-2 rounded-lg'>
                    <IoIosMore />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {actions.map(action => {
                    return (
                        <DropdownMenuItem key={action.key} className='flex items-center gap-2 cursor-pointer' onClick={() => handleClickItem(action.key)}>
                            {action.icon}{action.label}
                        </DropdownMenuItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default MoreActions