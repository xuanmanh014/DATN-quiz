import { ITopicWithQuizzes } from '@/types/common/index.type'
import { ITopic } from '@/types/topic/index.type'
import { quizOrQuizzes } from '@/utils/utils'
import Link from 'next/link'
import React, { FC } from 'react'

interface ITopicCardProps {
    topic: ITopicWithQuizzes
}

const TopicCard: FC<ITopicCardProps> = ({ topic }) => {
    const topicData = topic.topic as ITopic || {};
    const exerciseKey = topic?.topic?.topicName?.toLowerCase().split(" ").join("-");

    return (
        <div className='border border-gray-300 rounded-lg shadow-md p-4 flex items-start gap-4'>
            <img src={topicData.topicImage?.filePath} alt={topicData.topicName} className='w-[80px] h-[80px] rounded-lg' />

            <div>
                <Link href={`/exercises/${exerciseKey}`} className='underline text-blue-500 font-medium text-[20px]'>{topicData.topicName}</Link>

                <p className='my-1'>Level: {topicData.topicLevel}</p>

                <p className='text-[14px]'>{`${topic?.quizzes?.length} ${quizOrQuizzes(Number(topic?.quizzes?.length))}`}</p>
            </div>
        </div>
    )
}

export default TopicCard