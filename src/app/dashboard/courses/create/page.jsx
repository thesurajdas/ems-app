"use client";
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { LuX } from 'react-icons/lu';
export default function CreateCourse() {
  const [creating, setCreating] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [tag, setTag] = useState("");
  const [data, setData] = useState({
    qualification: "",
    degree: "",
    code: "",
    type: "",
    duration: ""
  });
  const handleKeyDown = () => {
    if (!tag.trim()) return;
    setSubjects([...subjects, tag]);
    setTag("");
  }
  const removeSubject = (index) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  }
  const createCourse = async (e) => {
    e.preventDefault();
    setCreating(true);
    const res = await fetch('/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, subjects })
    });
    if (res.ok) {
      setCreating(false);
      toast.success('Successfully created!');
      console.log({ ...data, subjects })
      formReset(e);
    } else {
      setCreating(false);
      toast.error('Something went wrong!');
    }
  }
  const formReset = (e) => {
    e.preventDefault();
    setData({
      qualification: "",
      degree: "",
      code: "",
      type: "",
      duration: 0,
      subjects: []
    });
    setAllSubjects([]);
  }
  const degrees = [
    "B.Tech (Bachelors in Technology)",
    "M.Tech (Masters in Technology)",
    "B.E (Bachelors in Engineering)",
    "M.E (Masters in Engineering)",
    "B.Arch (Bachelors in Architecture)",
    "M.Arch (Masters in Architecture)",
    "BBA (Bachelors in Business Administration)",
    "MBA (Masters in Business Administration)",
    "BCA (Bachelors in Computer Application)",
    "MCA (Masters in Computer Application)",
    "BDS (Bachelor of Dental Surgery)",
    "MDS (Master of Dental Surgery)",
    "MBBS (Bachelor of Medicine, Bachelor of Surgery)",
    "MD (Doctor of Medicine)",
    "MS (Master of Surgery)",
    "B.Pharm (Bachelor of Pharmacy)",
    "M.Pharm (Master of Pharmacy)",
    "B.Sc (Bachelor of Science)",
    "M.Sc (Master of Science)",
    "B.Com (Bachelor of Commerce)",
    "M.Com (Master of Commerce)",
    "B.A (Bachelor of Arts)",
    "M.A (Master of Arts)",
    "B.Ed (Bachelor of Education)",
    "M.Ed (Master of Education)",
    "BHM (Bachelor of Hotel Management)",
    "MHM (Master of Hotel Management)",
    "LLB (Bachelor of Laws)",
    "LLM (Master of Laws)",
  ];

  return (
    <>
      <form onSubmit={createCourse}>
        <div className="container w-full mx-auto grid rid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 rounded py-4">
          <label htmlFor="qualification">Qualification <span className="text-gray-500">*</span>
            <select id="qualification" value={data.qualification} onChange={(e) => setData({ ...data, qualification: e.target.value })} required>
              <option value="" className='font-extralight'>Select Qualification</option>
              <option value="Grduation">Grduation</option>
              <option value="Post Grduation">Post Grduation</option>
              <option value="PhD">PhD</option>
            </select>
          </label>
          <label htmlFor="degree">Degree <span className="text-gray-500">*</span>
            <select id="degree" value={data.degree} onChange={(e) => setData({ ...data, degree: e.target.value })} required>
              <option value="" className='font-extralight'>Select Degree</option>
              {degrees.sort().map((degree, index) => (
                <option key={index} value={degree}>{degree}</option>
              ))}
            </select>
          </label>
          <label htmlFor="code">Course Code <span className="text-gray-500">*</span>
            <input type="text" id="code" value={data.code} onChange={(e) => setData({ ...data, code: e.target.value })} placeholder="Code" autoComplete='off' required />
          </label>
          <label htmlFor="course_type">Degree Type <span className="text-gray-500">*</span>
            <select id="course_type" value={data.type} onChange={(e) => setData({ ...data, type: e.target.value })} required>
              <option value="" className='font-extralight'>Select Type</option>
              <option value="Regular">Regular</option>
              <option value="Distance">Distance</option>
            </select>
          </label>
          <label htmlFor="duration">Course Duration (Semester) <span className="text-gray-500">*</span>
            <input type="number" id="duration" value={data.duration} onChange={(e) => setData({ ...data, duration: e.target.value })} placeholder="Semester" required />
          </label>
          <label htmlFor="subjects">Course Subjects <span className="text-gray-500">*</span>
            <div className="items-center outline-none bg-white dark:bg-slate-800 text-gray-800 dark:text-white placeholder-gray-600 rounded-2xl text-xl p-2 font-light">
              <div className="container flex flex-wrap gap-2">
                {subjects.map((subject, index) => (
                  <span key={index} className="flex items-center justify-between bg-slate-200 dark:bg-slate-600 rounded-full gap-2 p-2">{subject} <LuX onClick={(e) => removeSubject(index)} className="cursor-pointer font-bold text-red-500 bg-slate-300 dark:bg-gray-700 rounded-full p-1" /></span>
                ))}
              </div>
              <input type="text" id="subjects" onChange={(e) => setTag(e.target.value)} value={tag} onKeyDown={(e) => (e.key == 'Enter') ? handleKeyDown(e) : null} onFocus={(e) => setCreating(true)} onBlur={(e) => setCreating(false)} className='bg-slate-100' placeholder="Add Subjects->" required={!subjects.length} />
            </div>
          </label>
          {
            useEffect(() => {
              console.log(subjects)
            }, [subjects])
          }
        </div>
        <Toaster />
        <div className='flex gap-2'>
          <button type='submit' className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-7 rounded-3xl disabled:bg-blue-400" disabled={creating}>Create</button>
          <button type='button' onClick={formReset} className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-7 rounded-3xl disabled:bg-gray-400">Reset</button>
        </div>
      </form>
    </>
  )
}
