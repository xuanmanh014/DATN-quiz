import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Dispatch, FC, SetStateAction } from "react"

interface IConfirmDeleteProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
    title?: string
    description?: string
    onCancel?: () => void
    onOk?: () => void
}

const ConfirmDelete: FC<IConfirmDeleteProps> = ({ open, setOpen, title = "", description = "", onCancel = () => { }, onOk = () => { } }) => {

    const handleCancel = () => {
        onCancel();
        setOpen(false);
    }

    const handleOk = () => {
        onOk();
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title || "Are you absolutely sure?"}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description || "This action cannot be undone. This will permanently delete and remove your data from our servers."}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleOk}>OK</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ConfirmDelete;