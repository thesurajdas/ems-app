"use client";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function CreateUser() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    role: "teacher",
    status: "active",
    gender: "male",
    dob: "",
    course: "",
    street: "",
    state: "",
    country: "",
  });
  const [courses, setCourses] = useState();
  useEffect(() => {
    const getCourses = async () => {
      const res = await fetch("http://localhost:3000/api/courses", { cache: 'no-store' });
      const datac = await res.json();
      setCourses(datac.courses);
    }
    getCourses();
  }, []);
  const createUser = async (e) => {
    e.preventDefault();
    console.log(data);
    toast.success("User Created Successfully")
  }
  return (
    <>
      <div className="p-6 flex flex-col">
        <h1>Create Teacher/ Student</h1>
        <form onSubmit={createUser} method="POST" encType="multipart/form-data">
          <div className="container w-full mx-auto grid grid-cols-3 gap-4 rounded py-4">
            <label htmlFor="name">Name <span className="text-gray-500">*</span>
              <input type="text" id="name" onChange={(e) => setData({ ...data, name: e.target.value })} placeholder="Name" required />
            </label>
            <label htmlFor="email">Email <span className="text-gray-500">*</span>
              <input type="email" id="email" onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="Email" required />
            </label>
            <label htmlFor="mobile">Mobile No. <span className="text-gray-500">*</span>
              <input type="tel" id="mobile" onChange={(e) => setData({ ...data, mobile: e.target.value })} placeholder="Mobile Number" required />
            </label>
            <label htmlFor="password">Password <span className="text-gray-500">*</span>
              <input type="password" id="password" placeholder="Password" onChange={(e) => setData({ ...data, password: e.target.value })} required />
            </label>
            <label htmlFor="role">Role <span className="text-gray-500">*</span>
              <div>
                <select id="role" value={data.role} onChange={(e) => setData({ ...data, role: e.target.value })}>
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
              <div>
                <select id="gender" value={data.gender} onChange={(e) => setData({ ...data, gender: e.target.value })} required>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </label>
            <label htmlFor="dob">Date of Birth <span className="text-gray-500">*</span>
              <input type="date" id="dob" onChange={(e) => setData({ ...data, dob: e.target.value })} required />
            </label>
            <label htmlFor="avatar">Profile Picture (Optional)
              <input type="file" id="avatar" accept="image/*" />
            </label>
            <label htmlFor="street">Address <span className="text-gray-500">*</span>
              <textarea name="street" rows={1} placeholder="Street Name" onChange={(e) => setData({ ...data, street: e.target.value })} required></textarea>
            </label>
            <label htmlFor="state">State <span className="text-gray-500">*</span>
              <input type="text" id="state" placeholder="State" onChange={(e) => setData({ ...data, state: e.target.value })} required />
            </label>
            <label htmlFor="country">Country <span className="text-gray-500">*</span>
              <input type="text" id="country" placeholder="Country" onChange={(e) => setData({ ...data, country: e.target.value })} required />
            </label>
            <label htmlFor="course">Course <span className="text-gray-500">*</span>
              <select id="course" value={data.course} onChange={(e) => setData({ ...data, course: e.target.value })} required>
                <option value="">Select Course</option>
                {courses && courses.map((course, i) => (
                  <option key={i} value={course._id}>{course.code}</option>
                ))}
              </select>
            </label>
          </div>
          <Toaster />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-7 rounded-3xl">Create</button>
        </form>
      </div>
    </>
  )
}