import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

type alertprops={
    heading:string,
    message:any,
    buttonContent:any
    buttonStyle:string,
    functionHandle:Function,
    functionArg?:any
}
export default function GeneralAlert({heading,message,buttonContent,buttonStyle,functionHandle,functionArg}:alertprops) {
  return (
      <div>
          <AlertDialog>
              <AlertDialogTrigger asChild>
                  <Button variant="outline" className={buttonStyle}>{buttonContent}</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                  <AlertDialogHeader>
                      <AlertDialogTitle>{heading}</AlertDialogTitle>
                      <AlertDialogDescription>
                          {message}
                      </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={()=>{
                        functionHandle(functionArg)
                      }}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
              </AlertDialogContent>
          </AlertDialog>
      </div>
  )
}
