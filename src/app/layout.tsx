import type { Metadata } from "next";
import "./globals.css";
import LayoutHeader from "@/layouts/header";

export const metadata: Metadata = {
    title: "Quiz",
    description: "English quiz",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="container m-auto">
                <LayoutHeader />
                {children}
            </body>
        </html>
    );
}