"use client"

import React, { FC, useEffect, useState } from 'react'
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { useParams } from 'next/navigation';
import { FavQuizApis } from '@/apis/fav-quizzes/index.api';
import { getMe } from '@/apis/auth/index.api';
import { IFavQuiz } from '@/types/fav-quizzes/index.type';
import { IoSettingsOutline } from "react-icons/io5";
import { useAppContext } from '@/contexts/app';
import SettingDialog from '@/components/pages/setting/Dialog';
import { useAppSelector } from '@/redux/store';

interface IplaySegmentProps {
    playSegment: () => void
}

const MoreActions: FC<IplaySegmentProps> = ({ playSegment = () => { } }) => {
    const tokenDecoded = getMe();
    const params = useParams<{ id: string }>();
    const [favQuiz, setIsFavQuiz] = useState<IFavQuiz>();
    const actions = [
        { label: favQuiz?._id ? "Remove from favourite lession list" : "Add to favourite lession list", key: favQuiz?._id ? "removeFavLession" : "addFavLession", icon: favQuiz?._id ? <FaHeart className='text-red-400' /> : <FiHeart /> },
        { label: "Settings", key: "settings", icon: <IoSettingsOutline /> },
    ];
    const { openNotiSuccess, openNotiError } = useAppContext();
    const [openSettings, setOpenSettings] = useState(false);
    const settings = useAppSelector(state => state.settings);
    const { autoReplay, replayKey, timeBetweenReplays } = settings;

    useEffect(() => {
        FavQuizApis.getByQuizId(params.id).then(response => {
            setIsFavQuiz(response.data);
        });
    }, [params.id])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === replayKey) {
                for (let i = 0; i < Number(autoReplay) + 1; i++) {
                    setTimeout(() => {
                        playSegment();
                    }, i * Number(timeBetweenReplays));
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [replayKey, autoReplay, timeBetweenReplays]);

    const handleAddFavQuiz = () => {
        const data = { user: tokenDecoded?._id, quiz: params.id } as IFavQuiz;
        FavQuizApis.addFavQuiz(data).then(response => {
            setIsFavQuiz(response.data);
            openNotiSuccess("Add favourite quiz");
        }).catch(error => {
            const { response } = error;
            openNotiError("Add favourite quiz", response?.data?.message);
        });
    }

    const handleRemoveFavQuiz = () => {
        FavQuizApis.removeFavQuiz(favQuiz?._id).then(() => {
            setIsFavQuiz({});
            openNotiSuccess("Remove favourite quiz");
        }).catch(error => {
            const { response } = error;
            openNotiError("Remove favourite quiz", response?.data?.message);
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
            case "settings":
                setOpenSettings(true);
            default:
                break;
        }
    }

    return (
        <>
            <div className="flex items-centter gap-8">
                {actions.map(action => {
                    return (
                        <div key={action.key} className='cursor-pointer text-[20px]' onClick={() => handleClickItem(action.key)} title={action.label} aria-label={action.label}>
                            {action.icon}
                        </div>
                    )
                })}
            </div>

            <SettingDialog open={openSettings} setOpen={setOpenSettings} />
        </>
    )
}

export default MoreActions