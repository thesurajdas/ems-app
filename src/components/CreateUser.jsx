"use client";
import { useState } from "react";

export default function CreateUser() {
  // const year = new Date().getFullYear();
  const [data, setData] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("teacher");
  const [status, setStatus] = useState("active");
  const [gender, setGender] = useState("male");
  const [dob, setDob] = useState();
  const handleStatus = (e) => {
    setStatus(e.target.value);
  }
  const createUser = async (e) => {
    e.preventDefault();
    setData({ name, email, mobile, role, status, gender, dob });
    console.log(data);
  }
  return (
    <>
      <form onSubmit={createUser}>
        <div className="container w-full mx-auto grid grid-cols-3 gap-4 rounded py-4">
          <label htmlFor="name">Name:
            <input type="text" id="name" onChange={(e) => setName(e.target.value)} placeholder="Name" />
          </label>
          <label htmlFor="email">Email:
            <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          </label>
          <label htmlFor="mobile">Mobile No.:
            <input type="tel" id="mobile" onChange={(e) => setMobile(e.target.value)} placeholder="Mobile Number" />
          </label>
          <label htmlFor="password">Password:
            <input type="password" id="password" placeholder="Password" />
          </label>
          <label htmlFor="role">Role:
            <div>
              <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>
            </div>
          </label>
          <label htmlFor="password">Status:
            <div className="flex gap-5 items-center w-full justify-center mt-4">
              <input type="radio" id="active" name="status" value="active" onChange={handleStatus} />
              <label htmlFor="active">Active</label>
              <input type="radio" id="inactive" name="status" value="inactive" onChange={handleStatus} />
              <label htmlFor="inactive">Inactive</label>
            </div>
          </label>
          <label htmlFor="gender">Gender:
            <div>
              <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </label>
          <label htmlFor="dob">Date of Birth:
            <input type="date" id="dob" onChange={(e) => setDob(e.target.value)} />
          </label>
          <label htmlFor="reg_no">Registration No.:
            <input type="text" id="reg_no" value="AU/YYYY/****" disabled />
          </label>
          <label htmlFor="roll_no">Roll No.:
            <input type="text" id="roll_no" value={"UG/COURSE/YYYY/****"} disabled />
          </label>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-7 rounded-3xl">Create</button>
      </form>
    </>
  )
}