import {
  Pencil, Trash, SettingsIcon, UserIcon,
} from "lucide-react";
import { CommandShortcut } from "@/components/ui/command";
import { useNavigate } from "react-router-dom";

export default function CommandController( setIsEditing : any) {
    let navigate = useNavigate();

    return (
        [{
            name: "profile",
            component: () => {
                return (<>
                    <UserIcon />
                    <span>Profile</span>
                    <CommandShortcut>⌘P</CommandShortcut></>)
            },
            function: () => {
                navigate("/account");
            }
        },
        {
            name: "edit",
            component: () => {
                return (<>
                    <Pencil />
                    <span>Edit</span>
                    <CommandShortcut>⌘B</CommandShortcut></>)
            },
            function: () => {
                setIsEditing(true);
            }
        },
        {
            name: "settings",
            component: () => {
                return (<>
                    <SettingsIcon />
                    <span>Settings</span>
                    <CommandShortcut>⌘S</CommandShortcut></>)
            },
            function: () => {
                navigate("/settings/general")
            }
        },
        {
            name: "delete_account",
            component: () => {
                return (<>
                    <Trash />
                    <span className=' text-red-600'>Delete Account</span>
                    <CommandShortcut>⌘S</CommandShortcut></>)
            },
            function: () => {
            }
        },

        ]
    )
}
