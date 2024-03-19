"use client";
import { useEffect, useState } from "react";

export default function CreateUser() {
  const [courses, setCourses] = useState();
  const [data, setData] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("teacher");
  const [status, setStatus] = useState("active");
  const [gender, setGender] = useState("male");
  const [dob, setDob] = useState();
  const [course, setCourse] = useState("");
  useEffect(() => {
    const getCourses = async () => {
      const res = await fetch("http://localhost:3000/api/courses", { cache: 'no-store' });
      const datac = await res.json();
      console.log(datac)
      setCourses(datac.courses);
    }
    getCourses();
  }, []);
  const createUser = async (e) => {
    e.preventDefault();
    setData({ name, email, mobile, role, status, gender, dob });
    console.log(data);
  }
  return (
    <>
      <form onSubmit={createUser} method="POST" encType="multipart/form-data">
        <div className="container w-full mx-auto grid grid-cols-3 gap-4 rounded py-4">
          <label htmlFor="name">Name <span className="text-gray-500">*</span>
            <input type="text" id="name" onChange={(e) => setName(e.target.value)} placeholder="Name" />
          </label>
          <label htmlFor="email">Email <span className="text-gray-500">*</span>
            <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          </label>
          <label htmlFor="mobile">Mobile No. <span className="text-gray-500">*</span>
            <input type="tel" id="mobile" onChange={(e) => setMobile(e.target.value)} placeholder="Mobile Number" />
          </label>
          <label htmlFor="password">Password <span className="text-gray-500">*</span>
            <input type="password" id="password" placeholder="Password" />
          </label>
          <label htmlFor="role">Role <span className="text-gray-500">*</span>
            <div>
              <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>
            </div>
          </label>
          <label htmlFor="password">Status <span className="text-gray-500">*</span>
            <div className="flex gap-5 items-center w-full justify-center mt-4">
              <input type="radio" id="active" name="status" value="active" onChange={(e) => setStatus(e.target.value)} />
              <label htmlFor="active">Active</label>
              <input type="radio" id="inactive" name="status" value="inactive" onChange={(e) => setStatus(e.target.value)} />
              <label htmlFor="inactive">Inactive</label>
            </div>
          </label>
          <label htmlFor="gender">Gender <span className="text-gray-500">*</span>
            <div>
              <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </label>
          <label htmlFor="dob">Date of Birth <span className="text-gray-500">*</span>
            <input type="date" id="dob" onChange={(e) => setDob(e.target.value)} />
          </label>
          <label htmlFor="avatar">Profile Picture (Optional)
            <input type="file" id="avatar" accept="image/*" />
          </label>
          <label htmlFor="address">Address <span className="text-gray-500">*</span>
            <textarea name="address" rows={1} placeholder="Street Name"></textarea>
          </label>
          <label htmlFor="state">State <span className="text-gray-500">*</span>
            <input type="text" id="state" placeholder="State" />
          </label>
          <label htmlFor="country">Country <span className="text-gray-500">*</span>
            <input type="text" id="country" placeholder="Country" />
          </label>
          <label htmlFor="course">Course <span className="text-gray-500">*</span>
            <select id="course" value={course} onChange={(e) => setCourse(e.target.value)}>
              {courses && courses.map((course, i) => (
                <option key={i} value={course.code}>{course.code}</option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-7 rounded-3xl">Create</button>
      </form>
    </>
  )
}