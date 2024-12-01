import { LearnVideoApis } from '@/apis/learn-video/index.api';
import LearnVideoCard from '@/components/pages/card/LearnVideoCard';
import { ILearnVideo } from '@/types/learn-video/index.type';
import { Separator } from '@radix-ui/react-dropdown-menu';
import React from 'react'

const fetchLearnVideos = async () => {
    const response = await LearnVideoApis.getAll();

    return response.data.data || [];
}

const LearnVideoPage = async () => {
    const learnVideos: ILearnVideo[] = await fetchLearnVideos();

    return (
        <div>
            <h1 className='text-[30px] font-bold'>All topics</h1>

            <Separator className='mt-4 mb-[50px]' />

            <div className="grid grid-cols-3 gap-6">
                {learnVideos.map(item => {
                    return (
                        <div key={item?._id} className="col-span-1">
                            <LearnVideoCard learnVideo={item} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default LearnVideoPage