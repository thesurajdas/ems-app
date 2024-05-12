"use client";
import CustomBarChart from "@/components/CustomBarChart";
import { useEffect, useState } from "react";

export default function ResultAnalysis() {
  const [courses, setCourses] = useState([]);
  const [exams, setExams] = useState([]);
  const [users, setUsers] = useState([]);
  const [results, setResults] = useState([]);
  const [cinput, setCinput] = useState({
    course: '',
    semester: '',
    session: '',
    user: '',
  });
  const [cdata, setCdata] = useState();
  const resetBtn = () => {
    setCinput({
      course: '',
      semester: '',
      session: '',
      user: '',
    });
    setCdata();
  }

  const courseData = async () => {
    const res = await fetch('http://localhost:3000/api/courses', { cache: "no-cache" });
    const data = await res.json();
    setCourses(data.courses);
  }
  const examData = async (course_id) => {
    const res = await fetch(`http://localhost:3000/api/exams?course_id=${course_id}`, { cache: "no-cache" });
    const data = await res.json();
    setExams(data.exams);
  }
  const usersData = async (course_id, session) => {
    const res = await fetch(`http://localhost:3000/api/users?course_id=${course_id}&session=${session}&role=student`, { cache: "no-cache" });
    const data = await res.json();
    setUsers(data.users);
    console.log(data.users)
  }
  const resultData = async (user_id) => {
    const res = await fetch(`http://localhost:3000/api/results?student_id=${user_id}`, { cache: "no-cache" });
    const data = await res.json();
    setResults(data.results);
    console.log(data.results)
  }
  const getChartData = async (student_id, semester) => {
    const res = await fetch(`http://localhost:3000/api/bar-chart?student_id=${student_id}&semester=${semester}`, { cache: "no-cache" });
    const data = await res.json();
    setCdata(data.chartData);
    console.log(cdata)
  }

  useEffect(() => {
    courseData();
  }, [])

  useEffect(() => {
    console.log(cinput);
  }, [cinput])

  const handleclick = () => {
    getChartData(cinput.user, cinput.semester);
  }

  return (
    <>
      <h1 className="mb-5">Result Analysis</h1>
      <div className="my-5 grid grid-cols-3 gap-4">
        <div className="flex items-center">
          <select className="p-2 rounded-lg" value={cinput.course} onChange={(e) => {
            setCinput({ ...cinput, course: e.target.value });
            examData(e.target.value);
            setCdata();
          }}>
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>{course.code}</option>
            ))
            }
          </select>
        </div>
        {cinput.course && <div className="flex items-center">
          <select className="p-2 rounded-lg" value={cinput.session} onChange={(e) => {
            setCinput({ ...cinput, session: e.target.value });
            usersData(cinput.course, e.target.value);
            setCdata();
          }}>
            <option value="">Section Session</option>
            {exams.map((exam) => (
              <option key={exam._id} value={exam.session}>{exam.session}</option>
            ))}
          </select>
        </div>}
        {cinput.session && <div className="flex items-center">
          <select className="p-2 rounded-lg" value={cinput.user} onChange={(e) => {
            setCinput({ ...cinput, user: e.target.value });
            resultData(e.target.value);
            setCdata();
          }}>
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </select>
        </div>}
        {cinput.user && <div className="flex items-center">
          <select className="p-2 rounded-lg" value={cinput.semester} onChange={(e) => {
            setCinput({ ...cinput, semester: e.target.value })
            setCdata();
          }}>
            <option value="">Select Semester</option>
            {results.map((result) => (
              <option key={result._id} value={result.semester}>{result.semester}</option>
            ))}
          </select>
        </div>}
      </div>
      <div className="flex my-4 gap-3">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed" onClick={() => handleclick()} disabled={!(cinput.course && cinput.session && cinput.semester && cinput.user)}>Show Chart</button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg" onClick={(e) => resetBtn()} hidden={!cinput.course}>Reset All</button>
      </div>
      {cdata && <CustomBarChart data={cdata} />}
    </>
  )
}
