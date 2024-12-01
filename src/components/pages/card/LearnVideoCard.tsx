import { Separator } from '@/components/ui/separator'
import { ILearnVideo } from '@/types/learn-video/index.type'
import Link from 'next/link'
import React, { FC } from 'react'

interface ILearnVideoCardProps {
    learnVideo?: ILearnVideo
}

const LearnVideoCard: FC<ILearnVideoCardProps> = ({ learnVideo }) => {
    return (
        <div className='border border-gray-300 px-5 py-3 rounded-lg'>
            <h3 className='text-[30px] text-blue-500 flex items-center gap-2'>
                <Link href={`/learn-video/${learnVideo?._id}`} className='underline'>
                    {learnVideo?.name}
                </Link>
            </h3>
            <Separator className='my-3' />

            <video src={learnVideo?.video.filePath}></video>
        </div>
    )
}

export default LearnVideoCard;