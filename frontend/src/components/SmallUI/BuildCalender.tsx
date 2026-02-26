import React from 'react'

export default function BuildCalender() {
  return (
    <div className=' w-full'>
      <ul className='FLEX flex-col'>
        <li className='flex flex-row'>
            <div className='flex flex-1 justify-center items-center h-15 border border-s border-amber-50 '>JAN</div>
            <div className='flex flex-1 justify-center items-center h-15 border border-s border-amber-50'>FEB</div>
            <div className='flex flex-1 justify-center items-center h-15 border border-s border-amber-50'>APR</div>
            <div className='flex flex-1 justify-center items-center h-15 border border-s border-amber-50'>MAR</div>
        </li>
        <li className='flex flex-row'>
            <div className='flex flex-1 justify-center items-center h-15 border border-s border-amber-50'>MAY</div>
            <div className='flex flex-1 justify-center items-center h-15 border border-s border-amber-50'>JUN</div>
            <div className='flex flex-1 justify-center items-center h-15 border border-s border-amber-50'>JUL</div>
            <div className='flex flex-1 justify-center items-center h-15 border border-s border-amber-50'>AGT</div>
        </li>
        
        <li className='flex flex-row'>
            <div className='flex flex-1 justify-center items-center h-15 border border-s border-amber-50'>SEP</div>
            <div className='flex flex-1 justify-center items-center h-15 border border-s border-amber-50'>OCT</div>
            <div className='flex flex-1 justify-center items-center h-15 border border-s border-amber-50'>NEV</div>
            <div className='flex flex-1 justify-center items-center h-15 border border-s border-amber-50'>DEC</div>
        </li>
      </ul>
      <div className="year-slider"></div>
    </div>
  )
}
