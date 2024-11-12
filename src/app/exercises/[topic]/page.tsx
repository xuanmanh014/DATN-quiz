"use client";

import { QuizApis } from '@/apis/quiz/index.api';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useAppContext } from '@/contexts/app';
import { IGetDto } from '@/types/common/index.type';
import { IQuiz } from '@/types/quiz/index.type';
import { convertKebabToTitle } from '@/utils/utils';
import Link from 'next/link';
import { useSearchParams, useRouter, useParams, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDebounceCallback } from "usehooks-ts"

const ExercisesByTopicPage = () => {
    const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
    const searchParams = useSearchParams();
    const search = searchParams.get("search");
    const { topic } = useParams();
    const query = { search } as IGetDto;
    const router = useRouter();
    const pathname = usePathname();
    const { setLoading, openNotiError } = useAppContext();

    const fetchData = () => {
        QuizApis.getByTopic(topic as string, query).then(response => {
            setQuizzes(response?.data);
        }).catch((error) => {
            const { response } = error;
            openNotiError("Get quizzes by topic", response?.data?.message);
        }).finally(() => setLoading(false));
    }

    useEffect(() => {
        fetchData();
    }, [search]);

    const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value) {
            router.push(`${pathname}?search=${value}`);
        } else {
            router.push(pathname);
        }
    }

    const debounced = useDebounceCallback(onSearchChange, 500);

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className='text-[30px] font-bold'>{convertKebabToTitle(topic as string)}</h1>
                <Input className='w-[500px]' placeholder='Search quiz here' defaultValue={search as string} onChange={event => debounced(event)} />
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