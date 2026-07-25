import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2Icon } from "lucide-react"
type alertprops={
    heading:string,
    message:any,
    buttonContent:any
    buttonStyle:string,
    functionHandle:Function,
    functionArg?:any
}
export default function DeleteAlertBox({heading,message,buttonContent,buttonStyle,functionHandle,functionArg}:alertprops) {
    return (

        <AlertDialog >
            <AlertDialogTrigger asChild>
                <Button variant="destructive" className={buttonStyle}> {buttonContent}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm" className=" bg-(--primary-bg-color)">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle className=" text-(--primary-text-color)">{heading}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {message}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={()=>{functionHandle(functionArg)}}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>


    )
}
