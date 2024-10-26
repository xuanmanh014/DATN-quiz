"use client";

import { getMe } from '@/apis/auth/index.api';
import { UserApis } from '@/apis/user/index.api';
import Information from '@/components/pages/information';
import { useAppContext } from '@/contexts/app';
import { IUser } from '@/types/user/index.type';
import { mapUserInformations } from '@/utils/utils';
import React, { useEffect, useState } from 'react'

const UserProfilePage = () => {
    const tokenDecoded = getMe();
    const [user, setUser] = useState<IUser>();
    const { openNotiError } = useAppContext();

    useEffect(() => {
        UserApis.getById(tokenDecoded?._id).then(response => {
            setUser(mapUserInformations(response?.data as IUser));
        }).catch(error => {
            const { response } = error;
            openNotiError("Get account information", response?.data?.message);
        });
    }, [])

    return (
        <div>
            <Information title='Account information' dataSource={user} />
        </div>
    )
}

export default UserProfilePage