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
import QuizComments from './components/Comments';
import Loading from '@/components/pages/loading/Loading';
import { CiWarning } from "react-icons/ci";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";

const ExercisePage = () => {
    const params = useParams<{ id: string }>();
    const [quiz, setQuiz] = useState<IQuiz>();
    const { openNotiError } = useAppContext();
    const audioRef = useRef<HTMLAudioElement>(null);
    const [answer, setAnswer] = useState("");
    const [segmentIndex, setSegmentIndex] = useState(0);
    const [allAnswerRes, setAllAnswerRes] = useState<IAnswerResponse[]>([{
        isCorrect: false,
        isSkip: false,
        answer: "",
        success: false,
    }]);
    const [isSegmentPlayed, setIsSegmentPlayed] = useState(false);
    const router = useRouter();
    const quizSegments = quiz?.segments;
    const [loading, setLoading] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const [showSentence, setShowSentence] = useState(false);
    const [checkingValue, setCheckingValue] = useState("");
    const [showAllWords, setShowAllWords] = useState(false);
    const [isSkip, setIsSkip] = useState(false);
    const [isMatchAll, setIsMatchAll] = useState(false);

    useEffect(() => {
        QuizApis.getById(params.id).then(response => {
            setQuiz(response?.data);
            setLoading(false);
        }).catch((error) => {
            const { response } = error;
            openNotiError("Get quiz", response?.data?.message);
        });
    }, [params.id]);


    const handlePrevSegment = () => {
        if (segmentIndex > 0) {
            setSegmentIndex(prev => prev - 1);
            setAnswer(allAnswerRes?.[segmentIndex - 1]?.answer || "");
            playSegment(segmentIndex - 1);
            setIsMatchAll(false);
        }
    }

    const handleNextSegment = () => {
        if (segmentIndex <= Number(quiz?.segments?.length) - 1) {
            setSegmentIndex(prev => prev + 1);
            setAnswer(allAnswerRes?.[segmentIndex + 1]?.answer || "");
            playSegment(segmentIndex + 1);
            setAllAnswerRes(prev => {
                if (prev.length - segmentIndex > 1) {
                    return prev;
                }

                return [...prev, {
                    isCorrect: false,
                    isSkip: false,
                    answer: "",
                    success: false,
                }];
            });
            setIsMatchAll(false);
        }
    }

    const playSegment = (segmentIndex: number) => {
        const segment = quizSegments?.[segmentIndex] as ISegment;

        if (!segment) {
            console.error(`Segment at index ${segmentIndex} is undefined`);
            return;
        }

        const { startTime, endTime } = segment;
        const audio = audioRef.current;

        if (audio) {
            audio.currentTime = startTime;
            audio.play();
            setIsSegmentPlayed(true);
            setDisabled(true);

            setTimeout(() => {
                audio.pause();
                setIsSegmentPlayed(false);
                setDisabled(false);
            }, (endTime - startTime) * 1000);
        }
    }

    const pauseSegment = () => {
        const audio = audioRef.current;

        if (audio) {
            audio.pause();
            setIsSegmentPlayed(false);
        }
    }

    const handleSetAnswer = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAnswer(event.target.value);
        setShowSentence(false);
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleCheck();
        }
    };

    const handleSkipSegment = () => {
        setAnswer(quizSegments?.[segmentIndex].answer || "");
        setAllAnswerRes(prev => {
            const data = {
                isCorrect: true,
                isSkip: true,
                answer: quizSegments?.[segmentIndex].answer,
                success: true,
            }

            Object.assign(prev?.[segmentIndex], data);

            return prev;
        });
        const segmentAnswer = quizSegments?.[segmentIndex].answer || "";
        setIsSkip(true);
        setCheckingValue(segmentAnswer);
    }

    const handleDoneQuiz = () => {
        if (allAnswerRes.length === quizSegments?.length) {
            router.push("/done-quiz");
        } else {
            setShowAllWords(false);
            handleNextSegment();
            setShowSentence(false);
            setIsSkip(false);
        }
    }

    const handleCheck = () => {
        if (!showSentence) {
            setShowSentence(true);
        }

        const inputWords = answer.trim().split(" ");
        const segmentAnswer = quizSegments?.[segmentIndex].answer || "";
        const segmentAnswerWords = segmentAnswer?.split(" ");

        if (inputWords.length === segmentAnswerWords.length) {
            const allWordsMatch = inputWords.every((word, index) => {
                return word.toLowerCase() === segmentAnswerWords[index]?.toLowerCase();
            });

            if (allWordsMatch) {
                setAnswer(segmentAnswer);
                setShowSentence(false);
                setCheckingValue(segmentAnswer);
                setAllAnswerRes(prev => {
                    const data = {
                        isCorrect: true,
                        isSkip: false,
                        answer: quizSegments?.[segmentIndex].answer,
                        success: true,
                    }

                    Object.assign(prev?.[segmentIndex], data);

                    return prev;
                });
                setIsMatchAll(true);
            }
        }

        setCheckingValue(answer.trim());
    };

    const renderSentence = () => {
        const inputWords = checkingValue.split(" ");
        const segmentAnswer = quizSegments?.[segmentIndex].answer || "";
        const segmentAnswerWords = segmentAnswer?.split(" ");

        return segmentAnswerWords.map((word, index) => {
            const matchedWords = inputWords.filter((word, index) => {
                return word.toLowerCase() === segmentAnswerWords[index]?.toLowerCase();
            });

            let lengthCheck;

            if (matchedWords[index] === segmentAnswerWords[index]) {
                lengthCheck = matchedWords.length;
            } else {
                lengthCheck = matchedWords.length + 1;
            }

            if (!checkingValue || index >= lengthCheck) {
                return !showAllWords
                    ? <span key={index}>{"*".repeat(word.length)} </span>
                    : <span key={index}>{word} </span>;
            }

            let isLatestWord = index === matchedWords.length;

            return (
                <span key={index}>
                    <span
                        style={{
                            color: isLatestWord ? "green" : "black",
                            fontWeight: isLatestWord ? "bold" : "normal",
                        }}
                    >
                        {word}
                    </span>{" "}
                </span>
            );
        });
    };

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className='text-[30px] font-bold'>{quiz?.quizName}</h1>
                <MoreActions playSegment={() => playSegment(segmentIndex)} />
            </div>
            <Separator className='my-4' />
            <div className="grid grid-cols-4">
                <div className="col-span-2">
                    <audio ref={audioRef} src={quiz?.quizRecord?.filePath} controls></audio>

                    <div className="my-4"></div>
                    <div className="flex items-center gap-2 my-[30px]">
                        <Button variant={"outline"} onClick={handlePrevSegment} disabled={disabled || segmentIndex === 0}>
                            <FcPrevious className='cursor-pointer' />
                        </Button>
                        {segmentIndex + 1} / {quizSegments?.length}
                        <Button variant={"outline"} onClick={handleNextSegment} disabled={disabled || segmentIndex === Number(quizSegments?.length) - 1}>
                            <FcNext className='cursor-pointer' />
                        </Button>
                    </div>

                    <div className='flex items-start gap-3 flex-col'>
                        {!isSegmentPlayed
                            ? <Button variant={"outline"} onClick={() => playSegment(segmentIndex)}>
                                <FaPlay />
                            </Button>
                            : <Button variant={"outline"} onClick={pauseSegment}>
                                <FaPause />
                            </Button>}

                        <Textarea
                            rows={4}
                            value={answer}
                            onChange={handleSetAnswer}
                            onKeyDown={handleKeyPress}
                            placeholder="Type your answer here."
                            className='w-[400px]'
                        />

                        <div className="flex items-center justify-between w-[400px]">
                            {showSentence && checkingValue !== quizSegments?.[segmentIndex].answer
                                && <div>
                                    <div className='flex items-center gap-2 text-[20px] mb-2'><CiWarning className='text-yellow-600 text-[30px] font-medium' />Incorrect</div>
                                    {renderSentence()}
                                </div>
                            }

                            {
                                isMatchAll && <div className='flex items-center gap-2 text-[20px] text-green-600 font-medium'><FaCheck />You are correct!</div>
                            }

                            {(isSkip || checkingValue === quizSegments?.[segmentIndex].answer || answer === quizSegments?.[segmentIndex].answer) ? <Button className='bg-green-600' onClick={handleDoneQuiz}>Next</Button> :
                                <div className="flex items-center gap-4">
                                    {!showSentence && <Button className="bg-blue-500" onClick={handleCheck}>Check</Button>}
                                    {!isSkip && <div className='flex items-center gap-2'>
                                        {showSentence && <>
                                            {showAllWords ? <FaEyeSlash className='cursor-pointer text-[18px]' onClick={() => setShowAllWords(false)} /> :
                                                <FaRegEye className='cursor-pointer text-[18px]' onClick={() => setShowAllWords(true)} />}
                                        </>}
                                        <Button variant={'outline'} onClick={handleSkipSegment}>Skip</Button>
                                    </div>}
                                </div>}
                        </div>
                    </div>
                </div>

                <div className="col-span-2">
                    <QuizComments segmentIndex={segmentIndex} />
                </div>
            </div>
        </div>
    )
}

export default ExercisePage