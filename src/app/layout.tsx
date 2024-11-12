import type { Metadata } from "next";
import "./globals.css";
import dynamic from 'next/dynamic';
import { Toaster } from "@/components/ui/toaster"
import AppContextProvider from "@/contexts/app";
import LayoutFooter from "@/layouts/footer";
import OnlineTracker from "@/components/pages/web-socket/OnlineTracker";
import StoreProvider from "./StoreProvider";

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
                <StoreProvider>
                    <AppContextProvider>
                        <LayoutHeader />
                        <main>
                            <div className="container m-auto py-[50px] h-full">
                                {children}
                            </div>
                        </main>
                        <LayoutFooter />
                    </AppContextProvider>
                </StoreProvider>
                <OnlineTracker />
            </body>
        </html>
    );
}