"use client";
import { useState } from 'react';
import { LuX } from 'react-icons/lu';
export default function CreateCourse() {
  const [data, setData] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSubjects([...subjects, e.target.value]);
      e.target.value = '';
    }
  }
  const removeSubject = (index) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  }

  const createCourse = (e) => {
    e.preventDefault();
    console.log('Course Created');
  }

  return (
    <>
      {/* <form> */}
      <div className="container w-full mx-auto grid grid-cols-3 gap-4 rounded py-4">
        <label htmlFor="type">Degree <span className="text-gray-500">*</span>
          <select id="course_degree" onChange={(e) => setData(...data, e.target.value)}>
            <option value="Bachelors">Bachelors</option>
            <option value="Masters">Masters</option>
          </select>
        </label>
        <label htmlFor="cname">Programme Name <span className="text-gray-500">*</span>
          <input type="text" id="name" onChange={(e) => setData(...data, e.target.value)} placeholder="Name" />
        </label>
        <label htmlFor="ccode">Course Code <span className="text-gray-500">*</span>
          <input type="text" id="code" onChange={(e) => setData(...data, e.target.value)} placeholder="Course Code" />
        </label>
        <label htmlFor="cdegree">Course Degree <span className="text-gray-500">*</span>
          <input type="text" id="degree" onChange={(e) => setData(...data, e.target.value)} placeholder="Course Degree" />
        </label>
        <label htmlFor="ctype">Course Type <span className="text-gray-500">*</span>
          <input type="text" id="type" onChange={(e) => setData(...data, e.target.value)} placeholder="Course Type" />
        </label>
        <label htmlFor="cduration">Course Duration <span className="text-gray-500">*</span>
          <input type="number" id="duration" onChange={(e) => setData(...data, e.target.value)} placeholder="Course Duration" />
        </label>
        <label htmlFor="subjects">Course Subjects <span className="text-gray-500">*</span>
          <div className="items-center outline-none bg-white dark:bg-slate-800 text-gray-800 dark:text-white placeholder-gray-600 rounded-2xl text-xl p-2 font-light">
            <div className="flex gap-2">
              {subjects.map((subject, index) => (
                <span key={index} className="flex items-center justify-between bg-slate-200 dark:bg-slate-600 rounded-2xl gap-2 cursor-pointer p-2">{subject} <LuX onClick={(e) => removeSubject(index)} className="font-bold bg-slate-400 dark:bg-gray-800 rounded-full p-1" /></span>
              ))}
            </div>
            <input type="text" id="subjects" onKeyDown={handleKeyDown} placeholder="Subjects" />
          </div>
        </label>
      </div>
      <button type="button" onClick={createCourse} className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-7 rounded-3xl">Create</button>
      {/* </form> */}
    </>
  )
}
