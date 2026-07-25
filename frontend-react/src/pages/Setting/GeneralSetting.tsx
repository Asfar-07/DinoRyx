import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { SquareUserRound, LogIn,GlobeLock,Mail,Database,CreditCard, ShoppingCart,MenuSquare,CircleX } from "lucide-react"
import { OTPFormDeleteAccount } from '@/components/SmallUI/output-otp/OtpFormDeleteAccount'
import "./generalSetting.css"

export default function GeneralSetting() {
  const [selectedElement, setSelectedElement] = React.useState("Your Account");
  const [showOTP, setShowOTP] = React.useState(false);
  return (
    <div className='flex justify-end'>
      <MenuSquare className='text-(--primary-text-color) text-xl z-20 fixed top-5 left-5 cursor-pointer md:hidden' onClick={()=>{
        const left = document.querySelector(".setting-left") as HTMLElement;
        left.classList.toggle("active")
      }} />
      <section className='setting-left h-dvh w-[30%] max-w-[350px] min-w-[300px] border-r text-(--primary-text-color)'>
        <ScrollArea className="h-full p-5">
          <div>
            <div className="sitelogo my-8">Logo</div>
            <h4 className="my-4 text-sm  leading-none font-medium text-(--secondary-text-color)">Setting</h4>
                <div className="flex items-center gap-3 element-scroll text-[17px] w-full px-5 py-2 my-2 rounded-md cursor-pointer"
                onClick={()=>setSelectedElement("Your Account")}
                >
                  <SquareUserRound />
                  <span>Your Account</span>
                </div>
                <div className="flex items-center gap-3 element-scroll text-[17px] w-full px-5 py-2 my-2 rounded-md cursor-pointer"
                onClick={()=>setSelectedElement("Login")}
                >
                  <LogIn />
                  <span>Login</span>
                </div>
                <div className="flex items-center gap-3 element-scroll text-[17px] w-full px-5 py-2 my-2 rounded-md cursor-pointer"
                onClick={()=>setSelectedElement("Privacy controls")}
                >
                  <GlobeLock />
                  <span>Privacy controls</span>
                </div>
                <div className="flex items-center gap-3 element-scroll text-[17px] w-full px-5 py-2 my-2 rounded-md cursor-pointer"
                onClick={()=>setSelectedElement("Data and storage")}
                >
                  <Database />
                  <span>Data and storage</span>
                </div>
                <div className="flex items-center gap-3 element-scroll text-[17px] w-full px-5 py-2 my-2 rounded-md cursor-pointer"
                onClick={()=>setSelectedElement("Message preferences")}
                >
                  <Mail />
                  <span>Message preferences</span>
                </div>
                <h4 className="my-4 text-sm  leading-none font-medium text-(--secondary-text-color)">Payments and Record</h4>
                <div className="flex items-center gap-3 element-scroll text-[17px] w-full px-5 py-2 my-2 rounded-md cursor-pointer"
                onClick={()=>setSelectedElement("Billing")}
                >
                  <CreditCard />
                  <span>Billing</span>
                </div>
                <div className="flex items-center gap-3 element-scroll text-[17px] w-full px-5 py-2 my-2 rounded-md cursor-pointer"
                onClick={()=>setSelectedElement("Order")}
                >
                  <ShoppingCart />
                  <span>Order</span>
                </div>
          </div>
        </ScrollArea>
      </section>
      <section className='setting-right w-[70%] text-(--primary-text-color) h-dvh p-5'>
        {selectedElement === "Your Account" && mainAccount()}
        {selectedElement === "Login" && mainLogin(showOTP,setShowOTP)}
        {selectedElement === "Privacy controls" && mainPrivacyControls()}
        {selectedElement === "Data and storage" && mainDataAndStorage()}
        {selectedElement === "Message preferences" && mainMessagePreferences()}
        {selectedElement === "Billing" && mainBilling()}
        {selectedElement === "Order" && mainOrder()}

      </section>
    </div>
  )
}
function mainAccount() {
  return (
    <div className='setting-main-body flex'>
      <h1 className=' text-center  text-4xl flex-1'>Your Account</h1>
    </div>
  )
}
function mainLogin(showOTP:boolean,setShowOTP:React.Dispatch<React.SetStateAction<boolean>>) {
  
  return (
    <div className='setting-main-body flex flex-col items-center'>
      <h1 className=' text-center  text-4xl flex-1 mb-20'>Login</h1>
      <div className='flex flex-col gap-5  py-5'>
        <h3 className=' font-bold'>Delete your account</h3>
        <p>By deleting your account, you’ll no longer be able to access any of your data or log in to our organization. please confirm that you want to delete your account.
        </p>
        <Button variant="destructive" className=' grow-0 shrink-0 w-40 cursor-pointer'
        onClick={()=>setShowOTP(true)}>Delete account</Button>

      </div>
      {showOTP && <div className='fixed top-0 left-0 z-20 w-full h-dvh bg-neutral-900'>
        <CircleX className='absolute top-5 right-5 text-white cursor-pointer' onClick={()=>setShowOTP(false)} />
        <OTPFormDeleteAccount /> 
      </div>}
    </div>
  )
}
function mainPrivacyControls() {
  return (
    <div className='setting-main-body flex'>
      <h1 className=' text-center  text-4xl flex-1'>Privacy Controls</h1>
    </div>
  )
}
function mainDataAndStorage() {
  return (
    <div className='setting-main-body flex'>
      <h1 className=' text-center  text-4xl flex-1'>Data and Storage</h1>
    </div>
  )
}
function mainMessagePreferences() {
  return (
    <div className='setting-main-body flex'>
      <h1 className=' text-center  text-4xl flex-1'>Message Preferences</h1>
    </div>
  )
}
function mainBilling() {
  return (
    <div className='setting-main-body flex'>
      <h1 className=' text-center  text-4xl flex-1'>Billing</h1>
    </div>
  )
}
function mainOrder() {
  return (
    <div className='setting-main-body flex'>
      <h1 className=' text-center  text-4xl flex-1'>Order</h1>
    </div>
  )
}
