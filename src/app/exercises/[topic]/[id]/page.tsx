"use client";

import { QuizApis } from '@/apis/quiz/index.api';
import { Separator } from '@/components/ui/separator';
import { useAppContext } from '@/contexts/app';
import { IQuiz, ISegment, IAnswerResponse } from '@/types/quiz/index.type';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { FcNext, FcPrevious } from "react-icons/fc";
import { FaPlay } from "react-icons/fa6";
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FaCheck, FaPause } from "react-icons/fa";
import MoreActions from './components/MoreActions';

const ExercisePage = () => {
    const params = useParams<{ id: string }>();
    const [quiz, setQuiz] = useState<IQuiz>();
    const { openNotiError } = useAppContext();
    const audioRef = useRef<HTMLAudioElement>(null);
    const [answer, setAnswer] = useState("");
    const [segmentIndex, setSegmentIndex] = useState(0);
    const [allAnswerRes, setAllAnswerRes] = useState<IAnswerResponse[]>([]);
    const [isSegmentPlayed, setIsSegmentPlayed] = useState(false);
    const router = useRouter();

    useEffect(() => {
        QuizApis.getById(params.id).then(response => {
            setQuiz(response?.data);
        }).catch((error) => {
            const { response } = error;
            openNotiError("Get quiz", response?.data?.message);
        });
    }, [params.id]);

    const handleSubmitAnswer = () => {
        if (!answer) {
            openNotiError("Submit answer", "Please type your answer first!");
            return;
        }

        QuizApis.checkSegmentAnswer(params.id, segmentIndex, answer).then((response) => {
            if (response?.success) {
                setAllAnswerRes(prev => [...prev, { ...response, answer }]);
            } else {
                openNotiError("Answer", "Your answer is incorrect!");
            }
        }).catch((error) => {
            const { response } = error;
            openNotiError("Answer", response?.data?.message);
        });
    };

    const resetTimeAudio = () => {
        const audio = audioRef.current;

        if (audio) {
            audio.currentTime = 0;
            audio.pause();
        }
    }

    const handlePrevSegment = () => {
        if (segmentIndex > 0) {
            setSegmentIndex(prev => prev - 1);
            setAnswer(allAnswerRes?.[segmentIndex - 1]?.answer || "");
        }
        resetTimeAudio();
    }

    const handleNextSegment = () => {
        if (segmentIndex <= Number(quiz?.segments?.length) - 1) {
            setSegmentIndex(prev => prev + 1);
            setAnswer(allAnswerRes?.[segmentIndex + 1]?.answer || "");
        }
        resetTimeAudio();
    }

    const playSegment = (segment: ISegment) => {
        const { startTime, endTime } = segment;
        const audio = audioRef.current;

        if (audio) {
            audio.currentTime = startTime;
            audio.play();
            setIsSegmentPlayed(true);

            setTimeout(() => {
                audio.pause();
                setIsSegmentPlayed(false);
            }, (endTime - startTime) * 1000);
        }
    };

    const pauseSegment = () => {
        const audio = audioRef.current;

        if (audio) {
            audio.pause();
            setIsSegmentPlayed(false);
        }
    }

    const handleSetAnswer = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAnswer(event.target.value);
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            console.log("aaa")
            handleSubmitAnswer();
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className='text-[30px] font-bold'>{quiz?.quizName}</h1>
                <MoreActions />
            </div>
            <Separator className='my-4' />
            <audio ref={audioRef} src={quiz?.quizRecord?.filePath} controls></audio>

            <div className="my-4"></div>
            <div className="flex items-center gap-2 my-[30px]">
                <Button variant={"outline"} onClick={handlePrevSegment} disabled={segmentIndex === 0}>
                    <FcPrevious className='cursor-pointer' />
                </Button>
                {segmentIndex + 1} / {quiz?.segments?.length}
                <Button variant={"outline"} onClick={handleNextSegment} disabled={segmentIndex === Number(quiz?.segments?.length) - 1}>
                    <FcNext className='cursor-pointer' />
                </Button>
            </div>

            <div className='flex items-start gap-3 flex-col'>
                {!isSegmentPlayed ? <Button variant={"outline"} onClick={() => playSegment(quiz?.segments?.[segmentIndex])}>
                    <FaPlay />
                </Button>
                    : <Button variant={"outline"} onClick={pauseSegment}>
                        <FaPause />
                    </Button>}
                <Textarea
                    placeholder="Type your answer here."
                    rows={6}
                    value={answer}
                    onChange={handleSetAnswer}
                    disabled={allAnswerRes?.[segmentIndex]?.isCorrect}
                    onKeyDown={handleKeyPress}
                />
                {!allAnswerRes?.[segmentIndex]?.isCorrect ? <Button onClick={handleSubmitAnswer}>Submit Answer</Button> : <div className='flex items-center gap-3'>
                    <Button onClick={() => {
                        if (allAnswerRes.length === quiz?.segments?.length) {
                            router.push("/done-quiz");
                        } else {
                            handleNextSegment();
                        }
                    }}>Next</Button>
                    <div className='text-green-500 text-[20px] font-bold flex items-center gap-3'>
                        <FaCheck />
                        <p>You're correct!</p>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default ExercisePage