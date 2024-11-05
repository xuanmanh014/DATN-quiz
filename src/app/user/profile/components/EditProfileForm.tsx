"use client";

import { getMe } from '@/apis/auth/index.api';
import { UserApis } from '@/apis/user/index.api';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAppContext } from '@/contexts/app';
import { IProfileUpdate, IUser } from '@/types/user/index.type';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { FC } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const profileSchema = z.object({
    firstName: z.string().min(1, {
        message: "Please type your first name!"
    }),
    lastName: z.string().min(1, {
        message: "Please type your last name!"
    }),
    phoneNumber: z.string().min(1, {
        message: "Please type your phone number!"
    }),
});

interface IEditProfileForm {
    user: IUser
    refetchData: () => void
}

const EditProfileForm: FC<IEditProfileForm> = ({ user, refetchData = () => { } }) => {
    const tokenDecoded = getMe();
    const form = useForm(
        {
            resolver: zodResolver(profileSchema),
            defaultValues: {
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                phoneNumber: user.phoneNumber || "",
            },
        }
    );
    const { openNotiSuccess, openNotiError } = useAppContext();

    const onSubmit = (values: IProfileUpdate) => {
        UserApis.updateUser(tokenDecoded?._id, values).then((response) => {
            refetchData();
            openNotiSuccess("Update profile");
        }).catch((error) => {
            const { response } = error;
            openNotiError("Update profile", response?.data?.message);
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First name</FormLabel>
                            <FormControl>
                                <Input placeholder="Type your first name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last name</FormLabel>
                            <FormControl>
                                <Input placeholder="Type your last name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone number</FormLabel>
                            <FormControl>
                                <Input placeholder="Type your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="my-5 w-full h-[40px]">Submit</Button>
            </form>
        </Form>
    )
}

export default EditProfileForm