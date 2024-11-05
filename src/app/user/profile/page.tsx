"use client";

import { getMe } from '@/apis/auth/index.api';
import { UserApis } from '@/apis/user/index.api';
import Information from '@/components/pages/information';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAppContext } from '@/contexts/app';
import { IUser } from '@/types/user/index.type';
import { mapUserInformations } from '@/utils/utils';
import React, { useEffect, useState } from 'react'
import EditProfileForm from './components/EditProfileForm';

const UserProfilePage = () => {
    const tokenDecoded = getMe();
    const [user, setUser] = useState<IUser>();
    const { openNotiError } = useAppContext();
    const [open, setOpen] = useState(false);

    const getData = () => {
        UserApis.getById(tokenDecoded?._id).then(response => {
            setOpen(false);
            setUser(mapUserInformations(response?.data as IUser));
        }).catch(error => {
            const { response } = error;
            openNotiError("Get account information", response?.data?.message);
        });
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <Information
                title='Account information'
                dataSource={user}
                extra={<Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">Edit Profile</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                        </DialogHeader>

                        <EditProfileForm user={user} refetchData={getData} />
                    </DialogContent>
                </Dialog>}
            />
        </div>
    )
}

export default UserProfilePage