"use client";
import { useState } from 'react';
export default function CreateCourse() {
  const [name, setName] = useState('');
  const [ctype, setCtype] = useState('');
  const createCourse = async (e) => {
    e.preventDefault();
    // await fetch('http://localhost:3001/courses', {
    //     method: 'POST',
    // });
    console.log(name)
  }
  return (
    <>
      <form onSubmit={createCourse} method="POST" encType="multipart/form-data">
        <div className="container w-full mx-auto grid grid-cols-3 gap-4 rounded py-4">
          <label htmlFor="course_type">Degree <span className="text-gray-500">*</span>
            <select id="course_degree" value={ctype} onChange={(e) => setCtype(e.target.value)}>
              <option value="Bachelors">Bachelors</option>
              <option value="Masters">Masters</option>
            </select>
          </label>
          <label htmlFor="cname">Programme Name <span className="text-gray-500">*</span>
            <input type="text" id="cname" onChange={(e) => setName(e.target.value)} placeholder="Name" />
          </label>
          <label htmlFor="ccode">Course Code <span className="text-gray-500">*</span>
            <input type="text" id="ccode" onChange={(e) => setName(e.target.value)} placeholder="Course Code" />
          </label>
          <label htmlFor="cdegree">Course Degree <span className="text-gray-500">*</span>
            <input type="text" id="cdegree" onChange={(e) => setName(e.target.value)} placeholder="Course Degree" />
          </label>
          <label htmlFor="ctype">Course Type <span className="text-gray-500">*</span>
            <input type="text" id="ctype" onChange={(e) => setName(e.target.value)} placeholder="Course Type" />
          </label>
          <label htmlFor="cduration">Course Duration <span className="text-gray-500">*</span>
            <input type="number" id="cduration" onChange={(e) => setName(e.target.value)} placeholder="Course Duration" />
          </label>
          <label htmlFor="csubjects">Course Subjects <span className="text-gray-500">*</span>
            <input type="text" id="csubjects" onChange={(e) => setName(e.target.value)} placeholder="Course Subjects" />
          </label>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-7 rounded-3xl">Create</button>
      </form>
    </>
  )
}
