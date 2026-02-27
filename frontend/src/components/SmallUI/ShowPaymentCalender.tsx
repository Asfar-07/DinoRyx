import React, { useState, type ReactEventHandler } from 'react'

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
  const date = new Date();
  let todayDate = date.toLocaleDateString();

  const [selectedYear, setSelectedYear] = useState("2026");
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
          return(<div className=' absolute w-full h-full z-10 bg-[#ff1a1a94]'></div>)
        }
      }
    }
    return true;
  }
  return (
    <div className=' w-full'>
      <div className='flex w-full justify-between'>
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
    </div>
  )
}
