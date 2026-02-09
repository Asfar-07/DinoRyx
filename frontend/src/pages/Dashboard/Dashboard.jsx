import React, { useEffect, useState,useRef } from "react";
import NavProfile from "@/components/Navbar/NavProfile";
import NotifyIcon from "@/components/SmallUI/NotifyIcon";
import { CiSettings } from "react-icons/ci";
import {
  MdOutlineDashboard,
  MdAttachMoney,
} from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { IoAnalytics } from "react-icons/io5";
import { SiSimpleanalytics } from "react-icons/si";
import DashboardPrograms from "./Dashboard-Programs";
import AnnualIncome from "./AnnualIncome";
import DashboardSettings from "./Dashboard-Settings";
import ThemeMode from "@/components/SmallUI/ThemeMode";
import StudentView from "./Student-View";
import { useDispatch } from "react-redux";
import { setStudent } from "../../features/dashboard/dashboardSlice";
import "./dashboard.css";
import { handleDashboard } from "../../features/dashboard/dashboardService";

export default function Dashboard() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [activesection, setActiveSection] = useState("student");
  const [students, setStudents] = useState([
    {
      name: "John Smith",
      age: 28,
      program: "Muscle Gain",
      date: "2024-01-15",
      status: "excellent",
    },
    {
      name: "Sarah Johnson",
      age: 32,
      program: "Weight Loss",
      date: "2024-02-20",
      status: "good",
    },
    {
      name: "Emily Davis",
      age: 29,
      program: "General Fitness",
      date: "2024-03-25",
      status: "average",
    },
    {
      name: "David Brown",
      age: 35,
      program: "Weight Loss",
      date: "2024-04-05",
      status: "good",
    },
  ]);
  const [filteredStudents, setFilteredStudents] = useState(students);
  const [newstudentdata, setNewStudentData] = useState({
    name: "",
    age: 0,
    program: "",
    date: "",
    status: "",
  });
  const hasFetched = useRef(false);

  useEffect(() => {
    dispatch(setStudent(students));
  }, [students, dispatch]);

  useEffect(()=>{
    if (hasFetched.current) return;

    hasFetched.current = true;
    handleDashboard.createDashboard().then((res)=>{

    }).catch((e)=>{

    })
  },[])

  function changeSection(e) {
    const selectactive = document.querySelectorAll(".dash-section-active");
    console.log(selectactive);
    selectactive.forEach((element) => {
      element.className = "";
    });
    e.target.className = "dash-section-active";
  }

  const handleSearch = (e) => {
    const value = e.target.value;
    const result = students.filter((student) =>
      student.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredStudents(result);
  };
  const selectProgram = (e) => {
    const value = e.target.value;
    const result = students.filter((student) =>
      student.program.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredStudents(result);
  };
  function addNewStudent() {
    console.log(newstudentdata);
    setShowModal(false);
    setStudents([...students, newstudentdata]);
    setFilteredStudents([...filteredStudents, newstudentdata]);
    setNewStudentData({
      name: "",
      age: 0,
      program: "",
      date: "",
      status: "",
    });
  }
  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
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
            <li
              onClick={(e) => {
                setActiveSection("income");
                changeSection(e);
              }}
            >
              {" "}
              <MdAttachMoney /> Income
            </li>
            <li
              onClick={(e) => {
                setActiveSection("settings");
                changeSection(e);
              }}
            >
              {" "}
              <CiSettings /> Settings
            </li>
          </ul>
        </nav>

        <div className="dash-logout">
          {" "}
          <IoIosLogOut /> Logout
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-m-header">
          <h2>Trainer Dashboard</h2>

          <div className="dashboard-ur-profile">
            <NotifyIcon />
            <NavProfile />
            <ThemeMode />
          </div>
        </header>

        <section className="user-info-card">
          <div className="user-info">
            <img src="https://i.pravatar.cc/80" alt="trainer" />
            <div>
              <small>Trainer Name</small>
              <h3>USER NAME</h3>
            </div>
          </div>
          <div>
            <small>Certification</small>
            <p>ACE Certified</p>
          </div>
          <div>
            <small>Experience</small>
            <p>
              {" "}
              <IoAnalytics /> 8 Years
            </p>
          </div>
          <div style={{ marginRight: "80px" }}>
            <small>Active Students</small>
            <p>
              {" "}
              <FiUsers /> 10
            </p>
          </div>
        </section>
        <div className="add-btn">
          <button onClick={() => setShowModal(true)}>+ Add New Student</button>
        </div>
        {activesection === "student" && (
          <section className="students">
            <div className="students-dashboard-m-header">
              <h3>My Students</h3>

              <div className="studentuser-filters">
                <label htmlFor="userSearch">
                  <FaSearch />
                  <input
                    id="userSearch"
                    placeholder="Search students..."
                    onChange={handleSearch}
                  />
                </label>
                <label htmlFor="urPrograms">
                  <SiSimpleanalytics />
                  <select id="urPrograms" onChange={selectProgram}>
                    <option value="" selected>
                      All Programs
                    </option>
                    <option value="Muscle Gain">Muscle Gain</option>
                    <option value="Weight Loss">Weight Loss</option>
                    <option value="Athletic Training">Athletic Training</option>
                    <option value="General Fitness">General Fitness</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="studentuser-table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Program</th>
                    <th>Join Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredStudents.map((s, index) => (
                    <tr key={index}>
                      <td>{s.name}</td>
                      <td>{s.age}</td>
                      <td>{s.program}</td>
                      <td>{s.date}</td>
                      <td>
                        <span className={`badge ${s.status}`}>{s.status}</span>
                      </td>
                      <td>
                        <StudentView
                          students={s}
                          index={index}
                          setStudents={setStudents}
                          setFilteredStudents={setFilteredStudents}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
        {activesection === "programs" && <DashboardPrograms />}
        {activesection === "income" && <AnnualIncome />}
        {activesection === "settings" && <DashboardSettings />}
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
                    date: e.target.value,
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
