import { useState } from "react";
import { LuPencil } from "react-icons/lu";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import DeleteAlertBox from "@/components/SmallUI/DeleteAlertBox";
import { handleStudent } from "@/features/dashboard/dashboardService";
import GeneralLoader from "@/components/Loader/GeneralLoader";
import { FaSearch } from "react-icons/fa";
import { SiSimpleanalytics } from "react-icons/si";
import StudentSidebar from "./Student-Sidebar";
import "./styles/student-view.css";

type studentprops = {
  setStudents: any,
  setFilteredStudents: any,
  organizer: boolean,
  filteredStudents: any,
  dashboardID: string,
  students:any
}
export default function StudentView({ setStudents, setFilteredStudents, organizer, filteredStudents, dashboardID,students }: studentprops) {

  const [isloading, setisLoading] = useState<boolean>(false);
  const [openIndex,setOpenIndex]= useState<number|null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const result = students.filter((student:any) =>
      student.name.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredStudents(result);
  };
  const selectProgram = (e :any) => {
    const value = e.target.value;
    const result = students.filter((student:any) =>
      student.program.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredStudents(result);
  };


  function deleteStudet(index: any) {
    setisLoading(true);
    handleStudent.deleteStudentData(filteredStudents[index]._id, dashboardID).then((response) => {
      console.log(response);
      setStudents((student: any) => student.filter((_: any, i: number) => i !== index));
      setFilteredStudents((student: any) => student.filter((_: any, i: number) => i !== index));
      setOpenIndex(null);
      setisLoading(false);
    }).catch((error) => {
      console.log(error);
    })

  }
  return (
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
          <label htmlFor="urPrograms" className="flex-1">
            <SiSimpleanalytics />
            <select id="urPrograms" onChange={selectProgram}>
              <option value="">All Programs</option>
              <option value="Muscle Gain">Muscle Gain</option>
              <option value="Weight Loss">Weight Loss</option>
              <option value="Athletic Training">Athletic Training</option>
              <option value="General Fitness">General Fitness</option>
            </select>
          </label>
        </div>
      </div>

      <div className="studentuser-table-wrapper">
        <div>
          {isloading && <GeneralLoader />}
          <table>
            <thead>
              <tr className="table-head">
                <th>Name</th>
                <th>Age</th>
                <th>Program</th>
                <th>Join Date</th>
                <th>Status</th>
                {organizer && <th>Actions</th>}
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((s: any, index: number) => (
                <tr key={index}>
                  <td>{s.name}</td>
                  <td>{s.age}</td>
                  <td>{s.program}</td>
                  <td>{s.join_date}</td>
                  <td>
                    <span className={`badge ${s.progressStatus}`}>
                      {s.progressStatus}
                    </span>
                  </td>
                  {organizer && (
                    <td>
                      <div className="dash-action-btn">
                        <button
                          onClick={() => {
                            setOpenIndex(index);
                          }}
                        >
                          <IoEyeOutline />
                        </button>{" "}
                        <button
                          onClick={() => {
                            setOpenIndex(index);
                          }}
                        >
                          <LuPencil />
                        </button>
                        <DeleteAlertBox heading={"Delete Student"}
                          message={"are you sure? if you remove thsi student, its like wiping database. Please conform"}
                          buttonContent={<MdDeleteOutline />}
                          buttonStyle={""}
                          functionHandle={deleteStudet}
                          functionArg={index} />

                      </div>
                      { openIndex===index && (
                       <StudentSidebar 
                       student={s}
                       setStudent={setStudents}
                       dashboardId={dashboardID}
                       setOpenIndex={setOpenIndex}
                       deleteStudet={deleteStudet}
                       index={index}/>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="student-card">
            {filteredStudents.map((student: any, index: number) => (
              <main key={index}>
                <div className="student-card-left">
                  <h3>{student.name}</h3>
                  <ul>
                    <li>{student.age}</li>
                    <li>{student.program}</li>
                    <li>Joined {student.join_date}</li>
                  </ul>
                </div>
                <div className="student-card-right">
                  <span className={`badge ${student.progressStatus}`}>
                    {student.progressStatus}
                  </span>
                  <div className="dash-action-btn">
                    <button
                      onClick={() => {
                      setOpenIndex(index);
                      }}
                    >
                      <IoEyeOutline />
                    </button>{" "}
                    <button
                      onClick={() => {
                  setOpenIndex(index);
                      }}
                    >
                      <LuPencil />
                    </button>
                    <DeleteAlertBox heading={"Delete Student"}
                      message={"are you sure? if you remove thsi student, its like wiping database. Please conform"}
                      buttonContent={<MdDeleteOutline />}
                      buttonStyle={""}
                      functionHandle={deleteStudet}
                      functionArg={index} />

                  </div>
                </div>
                {openIndex===index && (
                       <StudentSidebar 
                       setStudent={setStudents}
                       student={student}
                       dashboardId={dashboardID}
                       setOpenIndex={setOpenIndex}
                       deleteStudet={deleteStudet}
                       index={index}/>
                      )}
              </main>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
