"use client"

import React, { FC, useEffect, useState } from 'react'
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { useParams } from 'next/navigation';
import { FavQuizApis } from '@/apis/fav-quizzes/index.api';
import { getMe } from '@/apis/auth/index.api';
import { IFavQuiz } from '@/types/fav-quizzes/index.type';
import { IoSettingsOutline } from "react-icons/io5";

const MoreActions = ({ }) => {
    const tokenDecoded = getMe();
    const params = useParams<{ id: string }>();
    const [favQuiz, setIsFavQuiz] = useState<IFavQuiz>();
    const actions = [
        { label: favQuiz?._id ? "Remove from favourite lession list" : "Add to favourite lession list", key: favQuiz?._id ? "removeFavLession" : "addFavLession", icon: favQuiz?._id ? <FaHeart /> : <FiHeart /> },
        { label: "Settings", key: "settings", icon: <IoSettingsOutline /> },
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
        <div className="flex items-centter gap-8">
            {actions.map(action => {
                return (
                    <div key={action.key} className='cursor-pointer text-[20px]' onClick={() => handleClickItem(action.key)} title={action.label} aria-label={action.label}>
                        {action.icon}
                    </div>
                )
            })}
        </div>
    )
}

export default MoreActions