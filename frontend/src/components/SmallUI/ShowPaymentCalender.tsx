import React, { useState, type ReactEventHandler } from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"


export default function ShowPaymentCalender() {
  const paymented = [
    {
      _id: 1,
      amount: "200$",
      date: "2025-05-1",
      discount: "20%",
      paid_Date: 13134213421
    },
    {
      _id: 2,
      amount: "200$",
      date: "2025-07-1",
      discount: "20%",
      paid_Date: 13134213421
    },
    {
      _id: 3,
      amount: "200$",
      date: "2025-08-1",
      discount: "20%",
      paid_Date: 13134213421
    }, {
      _id: 4,
      amount: "200$",
      date: "2025-09-1",
      discount: "20%",
      paid_Date: 13134213421
    }
    , {
      _id: 5,
      amount: "200$",
      date: "2025-12-1",
      discount: "20%",
      paid_Date: 13134213421
    }, {
      _id: 6,
      amount: "200$",
      date: "2026-01-1",
      discount: "20%",
      paid_Date: 13134213421
    }
  ]
   type setAllData={
      amount:string,
      discount:string,
      date:string
    }
  const date = new Date();
  let todayDate = date.toLocaleDateString();

  const [selectedYear, setSelectedYear] = useState("2026");
  const [isPaymentMode,setPaymentMode]= useState(false);
  const [paymentDate,setPaymentDate] =useState("");
  const [paymentDetails,setPaymentDetails]=useState({
    amount:"",
    discount:""
  })
  const [failed,setFailed]=useState({
    isFail:false,
    message:""
  })
  const months = ["JAN", "FEB", "APR", "MAR", 'MAY', 'JUN', 'JUL', 'AGT', "SEP", 'OCT', "NEV", 'DEC'];
  const starting_date = "2025-04-1";

  function beforeStaring(monthIndex: number) {
    if (Number(selectedYear) >= Number(starting_date.split("-")[0])) {
      if ((monthIndex + 1) < Number(starting_date.split("-")[1])) {
        if (Number(selectedYear) === Number(starting_date.split("-")[0])) {
          return (<div className=' absolute w-full h-full z-15 bg-(--primary-bg-color)'></div>);
        }
      }
    } else {
      return (<div className=' absolute w-full h-full z-15 bg-(--primary-bg-color)'></div>);
    }
  }

  function handleStarting(monthIndex: number) {
    if (selectedYear === starting_date.split("-")[0]) {
      if ((monthIndex + 1) === Number(starting_date.split("-")[1])) {
        return (<div className='flex justify-center items-center absolute font-extrabold w-full h-full z-20'>Starting</div>);
      }

    }
  }

  function afterToday(monthIndex: number) {
    if (Number(selectedYear) <= Number(todayDate.split("/")[2])) {
      if ((monthIndex + 1) >= Number(todayDate.split("/")[0]) + 1) {
        if (Number(selectedYear) === Number(todayDate.split("/")[2])) {
          return (<div className=' absolute w-full h-full z-15 bg-(--primary-bg-color)'></div>);
        }
      }
    } else {
      return (<div className=' absolute w-full h-full z-15 bg-(--primary-bg-color)'></div>);
    }
  }

  function checkPayment(monthIndex: number) {

    for (let i = 0; i < paymented.length; i++) {
      if (Number(selectedYear) === Number(paymented[i].date.split("-")[0])) {
        if (Number(monthIndex + 1) === Number(paymented[i].date.split("-")[1])) {
          return (<div className=' absolute w-full h-full z-10 bg-[#01ff0866]'></div>);
        }else{
          return(<div className=' absolute w-full h-full z-10 bg-[#ff1a1a94]' onClick={(e)=>{
                isPaymentMode && selectPaymentDate(e,monthIndex);
              }}></div>)
        }
      }
    }
    return true;
  }

  function selectPaymentDate(e: React.ChangeEvent<any>, monthIndex: number) {
    const currentActive = document.querySelectorAll(".paymentActive");
    currentActive.forEach((item) => {
      item.classList.remove("paymentActive");
    })
    e.target.classList.add("paymentActive");
    const setDate = selectedYear + "-" + (monthIndex + 1) + "-" + "1"
    setPaymentDate(setDate)
  }

  function sendToBack(data:setAllData){
    
  }

  function savePayment(isPayment:boolean) {
     const setAllData={
      amount:paymentDetails.amount,
      discount:paymentDetails.discount,
      date:paymentDate
    }
    if(isPayment){
      try{
      if(paymentDate.length === 0)  throw "Please select payment date";
      if(paymentDetails.amount.length === 0)  throw "Please enter amount";
      if (isNaN(Number(paymentDetails.amount)) || isNaN(Number(paymentDetails.discount)) ) throw "Please give currect amount and discount"
      sendToBack(setAllData);
    }
    catch(error:any){
      setFailed({isFail:true,message:error})
      setTimeout(()=>{
        setFailed({isFail:false,message:""})
      },5000)
    }
    }else{
      sendToBack(setAllData);
    }
  }

  function cancelPayment(){
    const currentActive = document.querySelectorAll(".paymentActive");
    if(currentActive){
       currentActive.forEach((item) => {
      item.classList.remove("paymentActive");
    })
    }
    setPaymentMode(false)
    setPaymentDate("")
    setPaymentDetails({
    amount:"",
    discount:""
  })
  }

  return (
    <div className=' w-full'>
      <div className='flex w-full justify-between' >
        <h5>Fees</h5>
        <select onChange={(e: React.ChangeEvent<any>) => {
          setSelectedYear(e.target.value)
        }} className='h-7 rounded-sm border px-3 mb-3 bg-(--primary-bg-color)' >
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026" selected>2026</option>
          <option value="2027" >2027</option>
        </select>
      </div>
      <ul className='flex flex-col'>
        <li className='flex flex-row flex-wrap w-75'>
          {months.map((name, index) => (
            <div className='flex justify-center items-end relative font-extralight text-[12px] w-18.75  h-18 border border-s border-amber-50 '>
              {beforeStaring(index)}
              {handleStarting(index)}
              {afterToday(index)}
              {checkPayment(index)}
              {name}
              
            </div>
          ))}

        </li>
      </ul>
      {isPaymentMode &&
      <section className='flex flex-col w-full gap-1 my-4'>
        <div className='flex w-full'>
          <input type="text" value={paymentDate} className='flex-1' placeholder='Please select date' onChange={()=>{}} disabled />
        </div>
        <div className='flex w-full gap-1'>
          <input type="text" className='flex-4 w-10' value={paymentDetails.amount}  onChange={(e: React.ChangeEvent<any>)=>{
            setPaymentDetails({...paymentDetails,amount:e.target.value})
          }} placeholder='Amount'/>
          <input type="text" className='flex-2 w-5' value={paymentDetails.discount} onChange={(e: React.ChangeEvent<any>)=>{
            setPaymentDetails({...paymentDetails,discount:e.target.value})
          }} placeholder='%'/>
        </div>
        <div className='flex gap-3 w-full justify-end mt-3'>
          {/* <button className='px-4 py-1.5 rounded-md bg-red-600'>Cencel</button> */}
        
          <>
          <button className='px-4 py-1.5 rounded-md bg-cyan-900 cursor-pointer' onClick={()=>{
            savePayment(true);
          }}>Not Attended</button>
          <button className='px-4 py-1.5 rounded-md bg-blue-500 cursor-pointer' onClick={()=>{
            savePayment(true);
          }}>Save Payment</button>
          </>
         
        </div>
        {failed.isFail && 
        <div>
            <Alert variant="destructive" className="max-w-md">
              <AlertCircleIcon />
              <AlertTitle>Payment failed</AlertTitle>
              <AlertDescription>
                Your payment could not be processed. {failed.message} and try again.
              </AlertDescription>
            </Alert>
        </div>}
        
      </section>
      }
      <div className='w-full flex justify-end gap-3'>
        {!isPaymentMode ?  <button className='px-4 py-1.5 rounded-md bg-blue-500 cursor-pointer' onClick={()=>{
          setPaymentMode(true)
        }}>Payment</button>: 
        <button className='px-4 py-1.5 rounded-md bg-red-600 cursor-pointer' onClick={cancelPayment}>Cencel</button>}
        
      
      </div>
    </div>
  )
}
