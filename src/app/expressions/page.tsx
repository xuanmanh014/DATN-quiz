import { Separator } from '@radix-ui/react-separator'
import Link from 'next/link'
import React from 'react'

const ExpressionsPage = () => {
    return (
        <div>
            <h1 className='text-[30px] font-bold'>Learn English Expressions with Coach Shane</h1>

            <Link href={"https://www.youtube.com/user/DailyEasyEnglish"} className='underline text-blue-500'>Coach Shane's Youtube Channel</Link>

            <Separator className='mt-4 mb-[50px]' />
        </div>
    )
}

export default ExpressionsPage