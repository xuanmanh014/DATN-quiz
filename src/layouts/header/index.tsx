import React from 'react'
import Logo from './components/Logo'
import Link from 'next/link'

const LayoutHeader = () => {
    return (
        <header className='flex items-center justify-between py-3'>
            <Logo />

            <div className="flex items-center gap-4">
                <Link href={"/auth"} className='cursor-pointer'>Login</Link>
                <Link href={"/auth"} className='cursor-pointer'>Register</Link>
            </div>
        </header>
    )
}

export default LayoutHeader