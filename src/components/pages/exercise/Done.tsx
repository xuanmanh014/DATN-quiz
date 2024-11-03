"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaCircleCheck } from "react-icons/fa6";

const DoneQuiz = () => {
    const router = useRouter();

    return (
        <div className='flex items-center flex-col gap-[40px] border-2 border-gray-200 rounded-lg m-auto w-[70%] p-4 shadow-lg'>
            <h2 className='text-[30px] font-semibold'>You have completed this exercise,
                good job!</h2>
            <FaCircleCheck className='text-[80px] text-green-600' />
            <div className="flex items-center gap-3">
                <Button onClick={() => router.push("/exercises/short-stories")}>Next exercise</Button>
                <Button variant={"outline"} onClick={() => router.back()}>Repeat this exercise</Button>
            </div>

            <Link href={"/exercises"} className='text-blue-500 underline'>View all exercises</Link>
        </div>
    )
}

export default DoneQuiz