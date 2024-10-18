import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FC } from "react";
import { IoIosLogOut } from "react-icons/io";

interface IUserServicesProps {
    userFullName?: string
}

const MenuKeys = {
    LOGOUT: "logout"
}

const UserServices: FC<IUserServicesProps> = ({ userFullName = "" }) => {
    const menu = [
        { key: MenuKeys.LOGOUT, label: "Logout", icon: <IoIosLogOut className="mr-2 h-4 w-4" /> },
    ];

    const handleClick = (key: string) => {
        switch (key) {
            case MenuKeys.LOGOUT:
                localStorage.removeItem("AccessToken");
                window.location.href = "/";
                break;

            default:
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