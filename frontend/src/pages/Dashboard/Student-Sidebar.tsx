import React, { useState } from 'react'
import DeleteAlertBox from "@/components/SmallUI/DeleteAlertBox";
import { MdDeleteOutline } from "react-icons/md";
import { LuPencil } from "react-icons/lu";
import BuildCalender from '@/components/SmallUI/BuildCalender';
import GeneralLoader from '@/components/Loader/GeneralLoader';
import { handleStudent } from '@/features/dashboard/dashboardService';
import ComboboxWithClear from '@/components/SmallUI/ComboboxWithClear';

import "./styles/student-sidebar.css"

type studentSideBarProps = {
    student: any,
    setStudent: any,
    setOpenIndex: Function,
    deleteStudet: Function,
    index: number
}
export default function StudentSidebar({ student, setStudent, setOpenIndex, deleteStudet, index }: studentSideBarProps) {
    type studentModel = {
        _id: number,
        name: string,
        age: number,
        address: string,
        contact: string,
        progressStatus: string,
        program: string,
        dashboardId: string,
    }
    type emptyModel = {}


    const progressFrameworks = [
        "starting",
        "good",
        "average",
        "excellent",
    ] as const
    const programFrameworks = [
        "Weight Loss",
        "Muscle Gain",
        "Athletic Training",
        "General Fitness",
    ] as const
    const [isediting, setIsEditing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [changedata, setChangeData] = useState<studentModel>(student);
    const [newdata, setNewData] = useState<studentModel | emptyModel>({ _id: student._id, dashboardId: student.dashboardId });


    const handleChange = (e: React.ChangeEvent<any>) => {
        setChangeData({ ...changedata, [e.target.name]: e.target.value });
        setNewData({ ...newdata, [e.target.name]: e.target.value })
    };

    function saveStudent(index: number) {
        if (isLoading) return;
        console.log(newdata);
        handleStudent.updateStudentData(newdata).then((response: any) => {
            setStudent((prev: any) =>
                prev.map((s: any, i: number) =>
                    i === index ? changedata : s
                ));
            setIsEditing(false)
            console.log(response);
        }).catch((e) => {
            console.log(e)
        })

    }
    return (

        <div className="student-sidebar-overlay">
            {isLoading && <GeneralLoader />}
            <aside className="student-sidebar">
                <div className="sidebar-header">
                    <h3>Student Details</h3>
                    <span
                        onClick={() => {
                            setOpenIndex(null);
                        }}
                    >
                        ×
                    </span>
                </div>

                <div className="sidebar-content">
                    <div className="info-row">
                        <div className="info-row">
                            {!isediting ? <>
                                <span>Name:</span>
                                <strong>{student.name} </strong>
                            </> : <>
                                <input type="text" value={changedata.name} name='name' placeholder='Name' onChange={handleChange} />
                            </>}
                        </div>

                        <div className="info-row">
                            {!isediting ? <>
                                <span>Age:</span>
                                <strong>{student.age}</strong>
                            </> : <>
                                <input type="number" value={changedata.age} name='age' className=' w-14' onChange={handleChange} />
                            </>}
                        </div>
                    </div>

                    <div className="info-row">
                        {!isediting ? <>
                            <span>address:</span>
                            {student.address != null ? <strong>{student.address}</strong> : <strong>no data</strong>}
                        </> : <>
                            <input type="text" value={changedata.address} name='address' placeholder='Address' onChange={handleChange} />
                        </>}
                    </div>

                    <div className="info-row">
                        <div className="info-row">
                            {!isediting ? <>
                                <span>contact:</span>
                                {student.contact != null ? <strong>{student.contact}</strong> : <strong>no data</strong>}
                            </> : <>
                                <input type="text" value={changedata.contact} name='contact' placeholder='Contact' onChange={handleChange} />
                            </>}
                        </div>
                        <div className="info-row">
                            {!isediting ? <span className={`badge ${student.progressStatus}`}>
                                {student.progressStatus}
                            </span> :
                                <div className='block relative'>
                                    <ComboboxWithClear frameworks={progressFrameworks}
                                        defaultValue={student.progressStatus}
                                        callBackFun={(item: any) => {
                                            setChangeData({ ...changedata, progressStatus: item });
                                            setNewData({ ...newdata, progressStatus: item })
                                        }}
                                    />
                                </div>
                            }
                        </div>
                    </div>

                    <div className="info-row">
                        <div className="info-row">
                            {!isediting ?
                                <div className='demo-selector'>{student.program}</div> :
                                <div className='block relative'>
                                    <ComboboxWithClear frameworks={programFrameworks}
                                        defaultValue={student.program}
                                        callBackFun={(item: any) => {
                                            setChangeData({ ...changedata, program: item });
                                            setNewData({ ...newdata, program: item })
                                        }}
                                    />
                                </div>
                            }
                        </div>
                        <div className="info-row">
                            <div className='demo-selector'>2000cal/day</div>
                        </div>
                    </div>

                    <div className="info-row">
                        <div className="calender-chart" > <h4>Fees</h4>
                            <BuildCalender />
                            <div className='calender-chart-contoller'>
                                <button>Payment</button>
                            </div>
                        </div>
                    </div>
                    <div className="info-col">
                        <label htmlFor="student-note">note</label>
                        <textarea name="" id="student-note" disabled={!isediting}></textarea>
                    </div>

                    <div className="student-sidebar-btn">
                        {!isediting ?
                            <>
                                <DeleteAlertBox heading={"Delete Student"}
                                    message={"are you sure? if you remove thsi student, its like wiping database. Please conform"}
                                    buttonContent={<MdDeleteOutline />}
                                    buttonStyle={"bg-red-600 rounded-2xl cursor-pointer"}
                                    functionHandle={deleteStudet}
                                    functionArg={index} />
                                <button className="edit-student-btn " onClick={() => {
                                    setIsEditing(true)
                                }}>
                                    <LuPencil />
                                </button>
                            </>
                            :
                            <>
                                <button className='bg-red-600 py-1 px-5 rounded-sm mr-4' onClick={() => {
                                    setIsEditing(false); setChangeData(student)
                                }}>cencel</button>
                                <button className='bg-blue-500 py-1 px-5 rounded-sm mr-4' onClick={() => {
                                    saveStudent(index);
                                }}>save</button>
                            </>}
                    </div>
                </div>
            </aside>
        </div>

    )
}
