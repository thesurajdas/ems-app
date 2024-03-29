"use client";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function CreateUser() {
  const year = new Date().getFullYear();
  const [semester, setSemester] = useState(0);
  const [data, setData] = useState({
    name: "",
    roll_no: "",
    email: "",
    password: "",
    mobile: "",
    role: "",
    status: "",
    gender: "",
    dob: "",
    course: "",
    session: "",
    semester: "",
    street: "",
    state: "",
    country: "",
  });
  const getRoll = () => {
    const roll = "AU/" + year + "/" + Math.floor(Math.random() * 10000);
    return roll;
  }
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const getCourses = async () => {
      const res = await fetch("http://localhost:3000/api/courses", { cache: 'no-store' });
      const datac = await res.json();
      setCourses(datac.courses);
    }
    getCourses();
    setData({ ...data, roll_no: getRoll() });
  }, []);

  useEffect(() => {
    courses.map((course) => {
      if (course._id === data.course) {
        setSemester(course.duration);
      }
    });
    console.log(semester)
  }, [data.course]);
  const createUser = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const rdata = await res.json();
    if (!res.ok) {
      return toast.error(rdata.message);
    }
    resetForm();
    toast.success("User Created Successfully")
  }
  const resetForm = () => {
    setData({
      name: "",
      roll_no: getRoll(),
      email: "",
      password: "",
      mobile: "",
      role: "",
      status: "",
      gender: "",
      dob: "",
      course: "",
      session: "",
      semester: "",
      street: "",
      state: "",
      country: "",
    });
  }
  return (
    <>
      <div className="p-6 flex flex-col">
        <h1>Create Teacher/ Student</h1>
        <form onSubmit={createUser} method="POST" encType="multipart/form-data">
          <div className="container w-full mx-auto grid grid-cols-3 gap-4 rounded py-4">
            <label htmlFor="roll_no">Roll No. <span className="text-gray-500">*</span>
              <input type="text" id="roll_no" value={data.roll_no} placeholder="Loading..." required readOnly />
            </label>
            <label htmlFor="name">Name <span className="text-gray-500">*</span>
              <input type="text" id="name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} placeholder="Name" required />
            </label>
            <label htmlFor="email">Email <span className="text-gray-500">*</span>
              <input type="email" id="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="Email" required />
            </label>
            <label htmlFor="mobile">Mobile No. <span className="text-gray-500">*</span>
              <input type="tel" id="mobile" value={data.mobile} onChange={(e) => setData({ ...data, mobile: e.target.value })} placeholder="Mobile Number" required />
            </label>
            <label htmlFor="password">Password <span className="text-gray-500">*</span>
              <input type="password" id="password" value={data.password} placeholder="Password" onChange={(e) => setData({ ...data, password: e.target.value })} required />
            </label>
            <label htmlFor="role">Role <span className="text-gray-500">*</span>
              <div>
                <select id="role" value={data.role} onChange={(e) => setData({ ...data, role: e.target.value })}>
                  <option value="">Select Role</option>
                  <option value="teacher">Teacher</option>
                  <option value="student">Student</option>
                </select>
              </div>
            </label>
            <label htmlFor="status">Status <span className="text-gray-500">*</span>
              <div className="flex gap-5 items-center w-full justify-center mt-4">
                <input type="radio" id="active" name="status" value="active" onChange={(e) => setData({ ...data, status: e.target.value })} />
                <label htmlFor="active">Active</label>
                <input type="radio" id="inactive" name="status" value="inactive" onChange={(e) => setData({ ...data, status: e.target.value })} />
                <label htmlFor="inactive">Inactive</label>
              </div>
            </label>
            <label htmlFor="gender">Gender <span className="text-gray-500">*</span>
              <select id="gender" value={data.gender} onChange={(e) => setData({ ...data, gender: e.target.value })} required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
            <label htmlFor="dob">Date of Birth <span className="text-gray-500">*</span>
              <input type="date" id="dob" value={data.dob} onChange={(e) => setData({ ...data, dob: e.target.value })} required />
            </label>
            <label htmlFor="avatar">Profile Picture (Optional)
              <input type="file" id="avatar" accept="image/*" />
            </label>
            <label htmlFor="street">Address <span className="text-gray-500">*</span>
              <textarea name="street" value={data.street} rows={1} placeholder="Street Name" onChange={(e) => setData({ ...data, street: e.target.value })} required></textarea>
            </label>
            <label htmlFor="state">State <span className="text-gray-500">*</span>
              <input type="text" id="state" value={data.state} placeholder="State" onChange={(e) => setData({ ...data, state: e.target.value })} required />
            </label>
            <label htmlFor="country">Country <span className="text-gray-500">*</span>
              <input type="text" id="country" value={data.country} placeholder="Country" onChange={(e) => setData({ ...data, country: e.target.value })} required />
            </label>
            <label htmlFor="course">Course <span className="text-gray-500">*</span>
              <select id="course" value={data.course} onChange={(e) => setData({ ...data, course: e.target.value })} required>
                <option value="">Select Course</option>
                {courses && courses.map((course, i) => (
                  <option key={i} value={course._id}>{course.code}</option>
                ))}
              </select>
            </label>
            <label htmlFor="semester">Semester <span className="text-gray-500">*</span>
              <select id="semester" value={data.semester} onChange={(e) => setData({ ...data, semester: e.target.value })} disabled={data.course === ""} required>
                <option value="">Select Semester</option>
                {semester && [...Array(semester)].map((_, i) => (
                  <option key={i} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </label>
            <label htmlFor="session">Session Year <span className="text-gray-500">*</span>
              <input type="number" id="session" value={data.session} placeholder="Session" onChange={(e) => setData({ ...data, session: e.target.value })} required />
            </label>
          </div>
          <Toaster />
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-7 rounded-3xl">Create</button>
            <button type="button" onClick={resetForm} className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-7 rounded-3xl">Reset</button>
          </div>
        </form>
      </div>
    </>
  )
}