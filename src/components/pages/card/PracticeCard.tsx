import Image from 'next/image'
import React, { FC } from 'react'

interface IPracticeCardProps {
    image?: string
    title?: string
    descriptions?: string
}

const PracticeCard: FC<IPracticeCardProps> = ({ image = "", title = "", descriptions = "" }) => {
    return (
        <div className='flex flex-col items-center justify-center gap-3 py-8'>
            <Image width={1000} height={1000} src={image} alt={title} className='w-[150px] h-[150px] object-cover' />
            <h3 className='text-[30px] font-semibold'>{title}</h3>
            <p className='text-center text-gray-500'>{descriptions}</p>
        </div>
    )
}

export default PracticeCard