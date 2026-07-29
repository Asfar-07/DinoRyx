import React, { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"
import { TfiClose } from "react-icons/tfi";
import { handlePayment } from '@/features/dashboard/dashboardService'
import GeneralLoader from '../Loader/GeneralLoader'
import GeneralAlert from './GeneralAlert'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type calenderProps = {
  studentId: number,
  dashboardId: string,
  student: any
}
export default function ShowPaymentCalender({ studentId, dashboardId, student }: calenderProps) {
  const [paymented, setPaymented] = useState(student.payments);
  type setAllData = {
    amount?: string,
    discount?: string,
    date?: string,
    present?: boolean,
    studentId?: number,
    dashboardId?: string
  }
  const date = new Date();
  let todayDate = date.toLocaleDateString();

  const [selectedYear, setSelectedYear] = useState("2026");
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentMode, setPaymentMode] = useState(false);
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    amount: "",
    discount: ""
  })
  const [failed, setFailed] = useState({
    isFail: false,
    message: ""
  })
  const months = ["JAN", "FEB", "APR", "MAR", 'MAY', 'JUN', 'JUL', 'AGT', "SEP", 'OCT', "NEV", 'DEC'];
  const starting_date = student.join_date;

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
          if (!paymented[i].present) {
            return (<Tooltip key="top" >
              <TooltipTrigger > <div className=' absolute left-0 top-0 w-full h-full z-10 bg-[#1c1725]' ><TfiClose className='font-light text-white z-11 text-7xl' /></div></TooltipTrigger>
              <TooltipContent side="top">
                <p>Student not presented</p>
              </TooltipContent>
            </Tooltip>)
          } else {
            return ( <Tooltip key="top" >
              <TooltipTrigger > <div className=' absolute left-0 top-0 w-full h-full z-10 bg-[#01ff0866]'></div></TooltipTrigger>
              <TooltipContent side="top">
                <div className='w-45 ' >
                  <h3 className='font-bold mb-0.5'>Paymented</h3>
                  <span className='font-light text-[10px]'>{paymented[i].date}</span>
                  <div className='w-full flex justify-between'>
                    <p>Amount: {paymented[i].amount}$</p>
                    <p>discount: {paymented[i].discount}%</p>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>);
          }
        }
      }
    }
    return (<Tooltip key="top" >
      <TooltipTrigger > <div className=' absolute left-0 top-0 w-full h-full z-10 bg-[#ff1a1a94]' onClick={(e) => {
        isPaymentMode && selectPaymentDate(e, monthIndex);
      }}></div></TooltipTrigger>
      <TooltipContent side="top">
        <p>Padding</p>
      </TooltipContent>
    </Tooltip>);
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

  function sendToBack(data: setAllData) {
    if(isLoading) return;
    setIsLoading(true)
    handlePayment.savePayment(data).then(() => {
      setIsLoading(false)
      setPaymented([...paymented, data])
      setPaymentDate("");
      setPaymentDetails({
        amount: "",
        discount: ""
      });
      const currentActive = document.querySelectorAll(".paymentActive");
      currentActive.forEach((item) => {
        item.classList.remove("paymentActive");
      })
    }).catch((error) => {
      setIsLoading(false)
      console.log(error);
    })
  }

  function savePayment(isPayment: boolean) {
    const setAllData: setAllData = {}
    setAllData.studentId = Number(studentId);
    setAllData.dashboardId = dashboardId;
    setAllData.date = paymentDate;
    try {
      if (paymentDate.length === 0) throw "Please select payment date";
      if (isPayment) {
        if (paymentDetails.amount.length === 0) throw "Please enter amount";
        if (isNaN(Number(paymentDetails.amount)) || isNaN(Number(paymentDetails.discount))) throw "Please give currect amount and discount"
        setAllData.amount = paymentDetails.amount;
        setAllData.discount = paymentDetails.discount;
        setAllData.present = true;
        sendToBack(setAllData);
      } else {
        setAllData.present = false;
        sendToBack(setAllData);
      }
    }
    catch (error: any) {
      setFailed({ isFail: true, message: error })
      setTimeout(() => {
        setFailed({ isFail: false, message: "" })
      }, 5000)
    }

  }

  function cancelPayment() {
    const currentActive = document.querySelectorAll(".paymentActive");
    if (currentActive) {
      currentActive.forEach((item) => {
        item.classList.remove("paymentActive");
      })
    }
    setPaymentMode(false)
    setPaymentDate("")
    setPaymentDetails({
      amount: "",
      discount: ""
    })
  }

  return (
    <div className=' w-full'>
      {isLoading && <GeneralLoader />}
      <div className='flex w-full justify-between' >
        <h5>Fees</h5>
        <select value={selectedYear} onChange={(e: React.ChangeEvent<any>) => {
          setSelectedYear(e.target.value)
        }} className='h-7 rounded-sm border px-3 mb-3 bg-(--primary-bg-color)' >
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
        </select>
      </div>
      <ul className='flex flex-row flex-wrap w-75'>
        {months.map((name, index) => (
          <li key={index} className='flex justify-center items-end relative font-extralight text-[12px] w-18.75  h-18 border border-s border-amber-50 '>
            {beforeStaring(index)}
            {handleStarting(index)}
            {afterToday(index)}
            {checkPayment(index)}
            {name}
          </li>
        ))}
      </ul>
      {isPaymentMode &&
        <section className='flex flex-col w-full gap-1 my-4'>
          <div className='flex w-full'>
            <input type="text" value={paymentDate} className='flex-1' placeholder='Please select date' onChange={() => { }} disabled />
          </div>
          <div className='flex w-full gap-1'>
            <input type="text" className='flex-4 w-10' value={paymentDetails.amount} onChange={(e: React.ChangeEvent<any>) => {
              setPaymentDetails({ ...paymentDetails, amount: e.target.value })
            }} placeholder='Amount' />
            <input type="text" className='flex-2 w-5' value={paymentDetails.discount} onChange={(e: React.ChangeEvent<any>) => {
              setPaymentDetails({ ...paymentDetails, discount: e.target.value })
            }} placeholder='%' />
          </div>
          <div className='flex gap-3 w-full justify-end mt-3'>
            {/* <button className='px-4 py-1.5 rounded-md bg-red-600'>Cencel</button> */}

            <>
              <GeneralAlert heading={'Are you absolutely sure?'}
                message={" This action cannot be undone. This will permanently delete your account from our servers"}
                buttonContent={"Not Present"}
                buttonStyle={"px-4 py-1.5 rounded-md bg-cyan-900 cursor-pointer"}
                functionHandle={savePayment}
                functionArg={false}
              />
              <GeneralAlert heading={'Are you absolutely sure?'}
                message={" This action cannot be undone. This will permanently delete your account from our servers"}
                buttonContent={"Save Payment"}
                buttonStyle={"px-4 py-1.5 rounded-md bg-blue-500 cursor-pointer"}
                functionHandle={savePayment}
                functionArg={true}
              />
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
        {!isPaymentMode ? <button className='px-4 py-1.5 rounded-md bg-blue-500 cursor-pointer' onClick={() => {
          setPaymentMode(true)
        }}>Payment</button> :
          <button className='px-4 py-1.5 rounded-md bg-red-600 cursor-pointer' onClick={cancelPayment}>Cencel</button>}


      </div>
    </div>
  )
}
