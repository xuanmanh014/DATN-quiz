"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FC } from "react";
import { IoIosLogOut } from "react-icons/io";
import { FaUser, FaHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsCardText } from "react-icons/bs";

interface IUserServicesProps {
    userFullName?: string
}

const MenuKeys = {
    LOGOUT: "logout",
    EDIT_PASSWORD: "/user/edit-password",
    USER_INFORMATION: "/user/profile",
    FAV_LESSIONS: "/user/favourite-lessions",
    FLASH_CARD: "/user/flash-card",
}

const UserServices: FC<IUserServicesProps> = ({ userFullName = "" }) => {
    const router = useRouter();
    const menu = [
        { key: MenuKeys.FLASH_CARD, label: "Flash cards", icon: <BsCardText className="mr-2 h-4 w-4" /> },
        { key: MenuKeys.FAV_LESSIONS, label: "Favourite lessions", icon: <FaHeart className="mr-2 h-4 w-4" /> },
        { key: MenuKeys.USER_INFORMATION, label: "Account information", icon: <FaUser className="mr-2 h-4 w-4" /> },
        { key: MenuKeys.EDIT_PASSWORD, label: "Change password", icon: <RiLockPasswordFill className="mr-2 h-4 w-4" /> },
        { key: MenuKeys.LOGOUT, label: "Logout", icon: <IoIosLogOut className="mr-2 h-4 w-4" /> },
    ];

    const handleClick = (key: string) => {
        switch (key) {
            case MenuKeys.LOGOUT:
                localStorage.removeItem("AccessToken");
                window.location.href = "/";
                break;
            default:
                router.push(key);
                break;
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <p className="cursor-pointer">{userFullName}</p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                {menu.map(item => {
                    return (
                        <DropdownMenuItem key={item.key} className="cursor-pointer" onClick={() => handleClick(item.key)}>
                            {item.icon}
                            <span>{item.label}</span>
                        </DropdownMenuItem>
                    )
                })}

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserServices;