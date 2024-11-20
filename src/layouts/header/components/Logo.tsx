import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from "../../../../assets/logo.png"

const Logo = () => {
    return (
        <Link href={"/"} className='flex items-center gap-3'>
            <Image src={logo} alt='Logo' width={1000} height={1000} className='w-[50px] h-[40px] rounded-full' />
            <p className='text-[20px] font-medium'>Daily quizzes</p>
        </Link>
    )
}

export default Logo