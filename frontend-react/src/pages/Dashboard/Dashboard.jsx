//@ts-nocheck
import React, { useEffect, useState, useRef } from "react";
import NavProfile from "@/components/Navbar/NavProfile";
import NotifyIcon from "@/components/SmallUI/NotifyIcon";
import { CiSettings } from "react-icons/ci";
import { MdOutlineDashboard, MdAttachMoney } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { IoIosLogOut, IoMdInformationCircleOutline } from "react-icons/io";
import { IoAnalytics, IoMenuSharp } from "react-icons/io5";
import { SiSimpleanalytics } from "react-icons/si";
import DashboardPrograms from "./Dashboard-Programs";
import AnnualIncome from "./AnnualIncome";
import DashboardSettings from "./Dashboard-Settings";
import { TiDocumentText } from "react-icons/ti";
import DashboardAbout from "./Dashboard-About";
import ThemeMode from "@/components/SmallUI/ThemeMode";
import StudentView from "./Student-View.tsx";
import { useDispatch, useSelector } from "react-redux";
import {
  setStudentData,
  setDashboardInfo,
  setLocationDate,
} from "../../features/dashboard/dashboardSlice";
import "./styles/dashboard.css";
import {
  handleDashboard,
  handleStudent,
  handlePayment
} from "../../features/dashboard/dashboardService";
import { calculateAge } from "@/utils/dateHandle";
import GeneralLoader from "@/components/Loader/GeneralLoader.jsx";


export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [activesection, setActiveSection] = useState("student");
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState(students);
  const [dashboard_Data, setDashboard_Data] = useState({});
  const [location, setLocation] = useState({});
  const [orgAge, setOrgAge] = useState("");
  const [newstudentdata, setNewStudentData] = useState({name: "",age: 0,program: "",join_date: "",progressStatus: ""});
  const hasFetched = useRef(false);
  const hasReduxed = useRef(false);
  const [isloading, setisLoading] = useState(false);
  const [sidebar,setSideBar]= useState("dashboard-sidebar-none");
  const [dashboard_id,setDashboard_Id] = useState(new URLSearchParams(window.location.search).get("dbID"))
  const dispatch = useDispatch();

  const redux_dash_data = useSelector(
    (state) => state.dashController.dashboardInfo,
  );
  const redux_location_data = useSelector(
    (state) => state.dashController.locationData,
  );
  const redux_students_data = useSelector(
    (state) => state.dashController.students,
  );
  function arrangePayment(record){
    const finalStudent=students.map((data,index)=>{
      let collect=[];
      for (let i = 0; i < record.length; i++) {
        if(record[i].studentId===data._id){
          collect=[...collect,record[i]]
        } 
      }
      return {...data,payments:collect};
    })
      // setStudents(finalStudent)
      setFilteredStudents(finalStudent)
      console.log(finalStudent)
      
  }
  useEffect(() => {
    if (hasReduxed.current && students.length === 0)  return;
    hasReduxed.current = true;
    dispatch(setStudentData(students));
    setFilteredStudents(students);
    handlePayment.collectPayment(dashboard_id).then((response)=>{
      arrangePayment(response)
    }).catch((error)=>{
      console.log(error)
    })
  }, [students]);

  //fetch data from backend
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;


    if (redux_dash_data == null) {
      setisLoading(true)
      handleDashboard.getDashboardData(dashboard_id).then((response) => {
          setDashboard_Data(response[0]);
          setLocation(response[1]);
          dispatch(setDashboardInfo(response[0]));
          dispatch(setLocationDate(response[1]));
          setisLoading(false)
          fetchStudentData();
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setDashboard_Data(redux_dash_data);
      setLocation(redux_location_data);
      setStudents(redux_students_data)
    }

    function fetchStudentData() {
      handleStudent.getStudentData(dashboard_id).then((response) => {
          setStudents(response);
          setFilteredStudents(response);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [dispatch]);

  useEffect(() => {
    const Age = calculateAge(dashboard_Data.startedOrg);
    setOrgAge(Age);
  }, [dashboard_Data]);

  function changeSection(e) {
    const selectactive = document.querySelectorAll(".dash-section-active");
    selectactive.forEach((element) => {
      element.className = "";
    });
    e.target.className = "dash-section-active";
  }

  function addNewStudent() {
    handleStudent.createStudentData(newstudentdata, dashboard_Data._id).then((responce) => {
        if (responce === "success") {
          setShowModal(false);
          setStudents([...students, newstudentdata]);
          setFilteredStudents([...filteredStudents, newstudentdata]);
          setNewStudentData({name: "",age: 0,program: "",date: "",progressStatus: ""});
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function controlSideBar(){
   sidebar==""? setSideBar("dashboard-sidebar-none") : setSideBar("");
  }
  return (
    <div className="dashboard">
      {isloading && <GeneralLoader />}

      <aside className={`dashboard-sidebar ${sidebar}`}>
        <div className="dashboard-logo">🏋️ Gym Trainer</div>
        <nav>
          <ul>
            <li className="dash-section-active">
              <MdOutlineDashboard /> Dashboard
            </li>
            <li
              onClick={(e) => {
                setActiveSection("student");
                changeSection(e);
              }}
            >
              {" "}
              <FiUsers /> Students
            </li>
            <li
              onClick={(e) => {
                setActiveSection("programs");
                changeSection(e);
              }}
            >
              {" "}
              <CgGym /> Programs
            </li>
            {/* <li>
              {" "}
              <MdOutlineAnalytics /> Analytics
            </li> */}
            {dashboard_Data.organizer && (
              <li
                onClick={(e) => {
                  setActiveSection("income");
                  changeSection(e);
                }}
              >
                {" "}
                <MdAttachMoney /> Income
              </li>
            )}
            <li
              onClick={(e) => {
                setActiveSection("about");
                changeSection(e);
              }}
            >
              {" "}
              <IoMdInformationCircleOutline /> About
            </li>
            {dashboard_Data.organizer && (
              <li
                onClick={(e) => {
                  setActiveSection("settings");
                  changeSection(e);
                }}
              >
                {" "}
                <CiSettings /> Settings
              </li>
            )}
          </ul>
        </nav>

        <div className="dash-logout">
          {" "}
          <IoIosLogOut /> Logout
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-m-header">
          <div className="dashboard-left-header">
            <IoMenuSharp
              className=" font-bold text-3xl cursor-pointer dash-menu"
              onClick={controlSideBar}
            />
            <h2 className=" font-bold text-xl">Trainer Dashboard</h2>
          </div>

          <div className="dashboard-ur-profile">
            <NotifyIcon />
            <NavProfile />
            <ThemeMode />
          </div>
        </header>

        <section className="user-info-card">
          <img src="https://i.pravatar.cc/80" alt="trainer" />
          <main>
            <div className="user-info">
              <div>
                <small>Trainer Name</small>
                <h3>{dashboard_Data.companyName} </h3>
              </div>
            </div>
            <aside>
              <div>
                <small>Certification</small>
                {dashboard_Data.certificate === null ? (
                  <p>
                    <TiDocumentText />
                    null
                  </p>
                ) : (
                  <p>
                    <TiDocumentText />
                    {dashboard_Data.certificate}
                  </p>
                )}
                <p>{dashboard_Data.certificate}</p>
              </div>
              <div>
                <small>Experience</small>
                <p>
                  {" "}
                  <IoAnalytics /> {orgAge}
                </p>
              </div>
              <div style={{ marginRight: "10px" }}>
                <small>Active Students</small>
                <p>
                  {" "}
                  <FiUsers /> {dashboard_Data.employees}
                </p>
              </div>
            </aside>
          </main>
        </section>
        {dashboard_Data.organizer && (
          <div className="add-btn">
            <button onClick={() => setShowModal(true)}>
              + Add New Student
            </button>
          </div>
        )}
        {activesection === "student" && (
          <StudentView
            setStudents={setStudents}
            setFilteredStudents={setFilteredStudents}
            organizer={dashboard_Data.organizer}
            filteredStudents={filteredStudents}
            dashboardID={dashboard_Data._id}
            students={students}
          />
        )}
        {activesection === "programs" && <DashboardPrograms />}
        {dashboard_Data.organizer && activesection === "income" && (
          <AnnualIncome />
        )}
        {activesection == "about" && <DashboardAbout />}
        {dashboard_Data.organizer && activesection === "settings" && (
          <DashboardSettings />
        )}
      </main>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Student</h3>
              <span className="close" onClick={() => setShowModal(false)}>
                ×
              </span>
            </div>

            <div className="modal-body">
              <label>Student Name</label>
              <input
                placeholder="Enter student name"
                value={newstudentdata.name}
                onChange={(e) => {
                  setNewStudentData({
                    ...newstudentdata,
                    name: e.target.value,
                  });
                }}
              />

              <label>Age</label>
              <input
                type="number"
                value={newstudentdata.age}
                placeholder="Enter age"
                onChange={(e) => {
                  setNewStudentData({ ...newstudentdata, age: e.target.value });
                }}
              />

              <label>Fitness Goal</label>
              <select
                value={newstudentdata.program}
                onChange={(e) => {
                  setNewStudentData({
                    ...newstudentdata,
                    program: e.target.value,
                  });
                }}
              >
                <option>Select fitness goal</option>
                <option>Weight Loss</option>
                <option>Muscle Gain</option>
                <option>General Fitness</option>
              </select>

              <label>Program Type</label>
              <select>
                <option>Select program</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>

              <label>Start Date</label>
              <input
                type="date"
                value={newstudentdata.date}
                onChange={(e) => {
                  setNewStudentData({
                    ...newstudentdata,
                    join_date: e.target.value,
                  });
                }}
              />
            </div>

            <div className="modal-footer">
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="submit-btn" onClick={addNewStudent}>
                Add Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
