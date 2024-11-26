"use client";

import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import React, { Dispatch, FC, SetStateAction, useContext, useMemo, useState } from "react";
import { FaCheckDouble } from "react-icons/fa";

interface IAppContext {
    openNotiSuccess: (title?: string, description?: string) => void;
    openNotiError: (title?: string, description?: string) => void;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>
}

export const AppContext = React.createContext<IAppContext | undefined>(
    undefined
);

export const useAppContext = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useAppContext must be use within AppContextProvider!");
    }

    return context;
}

interface AppContextProviderProps {
    children: React.ReactNode,
}

const AppContextProvider: FC<AppContextProviderProps> = ({ children }) => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const openNotiSuccess = (title?: string, description?: string) => {
        toast({
            title: <div className="flex items-center gap-2">
                <FaCheckDouble className="text-green-500" />
                {`${title} success!`}
            </div>,
            description: description,
            className: cn(
                'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
            ),
        });
    };

    const openNotiError = (title?: string, description?: string) => {
        toast({
            variant: "destructive",
            title: `${title} failed!`,
            description: description,
            className: cn(
                'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
            ),
        });
    };

    const values = useMemo(() => ({
        openNotiSuccess,
        openNotiError,
        loading, setLoading
    }), []);

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;