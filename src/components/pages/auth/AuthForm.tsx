"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { IAuthValues } from "@/types/auth/index.type"
import { AuthApis } from "@/apis/auth/index.api"
import { useRouter } from "next/navigation"

const loginSchema = z.object({
    email: z.string().min(1, {
        message: "Please type your email!"
    }),
    password: z.string().min(1, {
        message: "Please type your password!"
    }),
});

const registerSchema = z.object({
    email: z.string().min(1, {
        message: "Please type your email!"
    }),
    password: z.string().min(1, {
        message: "Please type your password!"
    }),
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

export const AuthType = {
    LOGIN: 1,
    REGISTER: 2
}

const AuthForm = () => {
    const [authType, setAuthType] = useState(AuthType.LOGIN);
    const router = useRouter();
    const form = useForm(
        {
            resolver: zodResolver(authType === AuthType.LOGIN ? loginSchema : registerSchema),
            defaultValues: {
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                phoneNumber: "",
            },
        }
    );

    const handleChangeAuthType = (authType: number) => {
        setAuthType(authType);
        form.reset();
    }

    const checkAuthTypeRenderTitle = (authType: number) => {
        switch (authType) {
            case AuthType.LOGIN:
                return "Login";
            case AuthType.REGISTER:
                return "Register";
            default:
                break;
        }
    }

    const checkAuthTypeRenderChoose = (authType: number) => {
        switch (authType) {
            case AuthType.LOGIN:
                return (
                    <div>
                        You don't have account? {" "} <span className="cursor-pointer text-blue-600 underline" onClick={() => handleChangeAuthType(AuthType.REGISTER)}>Register here!</span>
                    </div>
                )
            case AuthType.REGISTER:
                return (
                    <div>
                        You're already have account? {" "} <span className="cursor-pointer text-blue-600 underline" onClick={() => handleChangeAuthType(AuthType.LOGIN)}>Login here!</span>
                    </div>
                )
            default:
                break;
        }
    }

    const onSubmit = (values: IAuthValues) => {
        if (authType === AuthType.LOGIN) {
            AuthApis.login(values).then((response) => {
                localStorage.setItem("AccessToken", response);
                router.push("/")
            }).catch(() => {

            })
        } else {
            AuthApis.register(values).then(() => {
                setAuthType(AuthType.LOGIN);
            }).catch()
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-[500px] m-auto p-4 rounded-lg shadow-lg border border-gray-200 mt-[200px]">
                <h1 className="mb-8 text-[30px] text-center font-bold">{checkAuthTypeRenderTitle(authType)}</h1>

                {authType === AuthType.REGISTER && <>
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
                                <FormLabel>Lirst name</FormLabel>
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
                </>}

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Type your email" {...field} className="mb-5" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Type your password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {checkAuthTypeRenderChoose(authType)}

                <Button type="submit" className="my-5 w-full h-[40px]">Submit</Button>
            </form>
        </Form>
    )
}

export default AuthForm