"use client"

import React, { useEffect, useState } from 'react'
import Logo from './components/Logo'
import Link from 'next/link'
import { getAccessToken, getMe } from '@/apis/auth/index.api'
import useHasMounted from '@/hooks/useHasMounted'
import UserServices from './components/UserServices'
import { Separator } from '@/components/ui/separator'
import { CiClock1 } from "react-icons/ci";
import { OnlineTimeApis } from '@/apis/online-time/index.api'
import { millisecondsToMinutes } from '@/utils/utils'

const LayoutHeader = () => {
    const tokenDecoded = getMe();
    const accessToken = getAccessToken();
    const hasMounted = useHasMounted();
    const navs = [
        { label: "All exercises", key: "/exercises" },
        { label: "Learn video", key: "/learn-video" },
        { label: "Top users", key: "/top-users" },
        // { label: "English expressions", key: "/expressions" },
        // { label: "English pronounciation", key: "/english-pronunciation" },
        { label: "Help", key: "/support" },
    ];
    const [totalOnlineTime, setTotalOnlineTime] = useState(0);

    useEffect(() => {
        OnlineTimeApis.getTotalOnlineTimeOfDay(tokenDecoded?._id).then(response => {
            setTotalOnlineTime(response?.totalOnlineTime || 0);
        }).catch(() => {
            setTotalOnlineTime(0);
        })
    }, []);

    return (
        hasMounted && <header className='shadow-md'>
            <div className="container m-auto flex items-center justify-between py-2">
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

            <div className="container m-auto flex items-center justify-between">
                <div className='flex items-center gap-2' title="Time you've spent practicing today">
                    <CiClock1 />
                    <span>{millisecondsToMinutes(totalOnlineTime)}</span>
                    <span>minutes</span>
                </div>
                <div className="container m-auto flex justify-end py-3">
                    {accessToken
                        ? <UserServices userFullName={tokenDecoded?.userFullName} />
                        : <div className="flex items-center gap-4">
                            <Link href={"/auth"} className='cursor-pointer'>Login</Link>
                        </div>}
                </div>
            </div>
        </header>
    )
}

export default LayoutHeader