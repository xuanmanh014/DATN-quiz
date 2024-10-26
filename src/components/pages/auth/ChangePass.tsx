"use client";

import { AuthApis, getMe } from '@/apis/auth/index.api';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { PasswordInput } from '@/components/ui/input-password';
import { useAppContext } from '@/contexts/app';
import { IChangePass } from '@/types/auth/index.type';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const changePassSchema = z.object({
    currentPass: z.string().min(1, {
        message: "Please type your current password!"
    }),
    newPass: z.string().min(1, {
        message: "Please type your new password!"
    }),
});

const ChangePassForm = () => {
    const form = useForm(
        {
            resolver: zodResolver(changePassSchema),
            defaultValues: {
                currentPass: "",
                newPass: "",
            },
        }
    );
    const { openNotiSuccess, openNotiError } = useAppContext();
    const tokenDecoded = getMe();

    const onSubmit = (values: IChangePass) => {
        AuthApis.changePassword(tokenDecoded?._id, values).then(() => {
            openNotiSuccess("Change password");
            window.location.href = "/";
            form.reset();
        }).catch((error) => {
            const { response } = error;
            openNotiError("Change password", response?.data?.message);
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="m-auto p-4 rounded-lg shadow-lg border border-gray-200">
                <FormField
                    control={form.control}
                    name="currentPass"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Current password</FormLabel>
                            <FormControl>
                                <PasswordInput placeholder="Type your current password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="newPass"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New password</FormLabel>
                            <FormControl>
                                <PasswordInput placeholder="Type your new password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="my-5 w-full h-[40px]">Change password</Button>
            </form>
        </Form>
    )
}

export default ChangePassForm