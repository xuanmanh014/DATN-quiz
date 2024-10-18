import type { Metadata } from "next";
import "./globals.css";
import dynamic from 'next/dynamic';
import { Toaster } from "@/components/ui/toaster"
import AppContextProvider from "@/contexts/app";
import LayoutFooter from "@/layouts/footer";

export const metadata: Metadata = {
    title: "Quiz",
    description: "English quiz",
};

const LayoutHeader = dynamic(() => import('@/layouts/header'), { ssr: false })

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Toaster />
                <AppContextProvider>
                    <LayoutHeader />
                    <main className="container m-auto py-[50px]">
                        {children}
                    </main>
                    <LayoutFooter />
                </AppContextProvider>
            </body>
        </html>
    );
}