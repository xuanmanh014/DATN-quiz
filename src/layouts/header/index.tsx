"use client"

import React from 'react'
import Logo from './components/Logo'
import Link from 'next/link'
import { getAccessToken, getMe } from '@/apis/auth/index.api'
import useHasMounted from '@/hooks/useHasMounted'
import UserServices from './components/UserServices'
import { Separator } from '@/components/ui/separator'

const LayoutHeader = () => {
    const tokenDecoded = getMe();
    const accessToken = getAccessToken();
    const hasMounted = useHasMounted();
    const navs = [
        { label: "All exercises", key: "/exercises" },
        { label: "Top users", key: "/top-users" },
        { label: "Help", key: "/support" },
    ];

    return (
        hasMounted && <header className='shadow-md'>
            <div className="container m-auto flex items-center justify-between py-3">
                <Logo />

                <nav>
                    <ul>
                        {navs.map(nav => {
                            return (
                                <li key={nav.key} className='inline-block mx-[20px]'>
                                    <Link href={nav.key} className='inline-block'>
                                        {nav.label}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </div>

            <Separator />

            <div className="container m-auto flex justify-end py-3">
                {accessToken
                    ? <UserServices userFullName={tokenDecoded?.userFullName} />
                    : <div className="flex items-center gap-4">
                        <Link href={"/auth"} className='cursor-pointer'>Login</Link>
                    </div>}
            </div>
        </header>
    )
}

export default LayoutHeader