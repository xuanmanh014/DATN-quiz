import AuthForm from "@/components/pages/auth/AuthForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Quiz auth",
    description: "English quiz auth",
};

const AuthPage = () => {
    return (
        <AuthForm />
    )
}

export default AuthPage