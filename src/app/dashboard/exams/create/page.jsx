"use client";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { LuDelete } from "react-icons/lu";

export default function Exams() {
    const [semester, setSemester] = useState();
    const [courses, setCourses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [data, setData] = useState({
        name: "",
        mode: "",
        location: "",
        status: "",
        course_id: "",
        semester: "",
        session: "",
        result_status: "",
    });
    const resetForm = () => {
        setData({
            name: "",
            mode: "",
            location: "",
            status: "",
            course_id: "",
            semester: "",
            session: "",
            result_status: "",
        });
    }

    useEffect(() => {
        const fetchCourses = async () => {
            const res = await fetch('http://localhost:3000/api/courses', { cache: 'no-store' });
            const datac = await res.json();
            setCourses(datac.courses);
        }
        fetchCourses();
    }, []);

    useEffect(() => {
        courses.map((course) => {
            if (course._id === data.course_id) {
                setSemester(course.duration);
            }
        });
    }, [data.course_id]);

    const createExam = async (e) => {
        e.preventDefault();
        console.log(data);
        const res = await fetch('http://localhost:3000/api/exams', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...data, subject_details: subjects }),
        });
        const datar = await res.json();
        console.log(datar)
        toast.success("Exam created successfully!");
        resetForm();
    }
    return (
        <>
            <h1 className="m-2">Exams</h1>
            <p>Exam Details:</p>
            <form onSubmit={createExam}>
                <div className="container w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 rounded py-2">
                    <label htmlFor="name">Name<span className="text-gray-500">*</span>
                        <input type="text" id="name" name="name" placeholder="Exam Name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} required />
                    </label>
                    <label htmlFor="mode">Mode <span className="text-gray-500">*</span>
                        <select id="mode" name="mode" value={data.mode} onChange={(e) => setData({ ...data, mode: e.target.value })} required>
                            <option value="">Select Mode</option>
                            <option value="online">Online</option>
                            <option value="offline">Offline</option>
                        </select>
                    </label>
                    <label htmlFor="location">Exam Location <span className="text-gray-500">*</span>
                        <input type="text" id="location" name="location" placeholder="Exam Location" value={data.location} onChange={(e) => setData({ ...data, location: e.target.value })} required />
                    </label>
                    <label htmlFor="status">Visibility <span className="text-gray-500">*</span>
                        <select id="status" name="status" value={data.status} onChange={(e) => setData({ ...data, status: e.target.value })} required>
                            <option value="">Select Status</option>
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </label>
                    <label htmlFor="subject_name">Result Status <span className="text-gray-500">*</span>
                        <select id="result_status" name="result_status" value={data.result_status} onChange={(e) => setData({ ...data, result_status: e.target.value })} required>
                            <option value="">Select Result Status</option>
                            <option value="pending">Pending</option>
                            <option value="published">Published</option>
                        </select>
                    </label>
                    <label htmlFor="course_id">Course <span className="text-gray-500">*</span>
                        <select id="course_id" name="course_id" value={data.course_id} onChange={(e) => setData({ ...data, course_id: e.target.value })} required>
                            <option value="">Select Course</option>
                            {courses.map((course) => (
                                <option key={course._id} value={course._id}>{course.code}</option>
                            ))}
                        </select>
                    </label>
                    <label htmlFor="semester">Semester <span className="text-gray-500">*</span>
                        <select id="semester" value={data.semester} onChange={(e) => setData({ ...data, semester: e.target.value })} disabled={data.course_id === ""} required>
                            <option value="">Select Semester</option>
                            {semester && [...Array(semester)].map((_, i) => (
                                <option key={i} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                    </label>
                    <label htmlFor="session">Session <span className="text-gray-500">*</span>
                        <input type="number" id="session" name="session" placeholder="Session" value={data.session} onChange={(e) => setData({ ...data, session: e.target.value })} required />
                    </label>
                </div>
                <div className="" hidden={data.semester === ""}>
                    <p className="my-2">Subject Details:</p>
                    <button type="button" className="bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-3xl" onClick={(e) => {
                        setSubjects([...subjects, { subject_name: "", total_marks: "", exam_date: "", exam_time: "" }]);
                    }}>Add Subjects</button>

                    {subjects.map((_, i) => (
                        <div key={i} className="flex justify-center gap-2">
                            <div className="container w-full mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 r ounded py-2">
                                <label htmlFor="subject_name">{i}. Subject Name <span className="text-gray-500">*</span>
                                    <select id="subject_name" name="subject_name" value={subjects[i].subject_name} onChange={(e) => {
                                        const newSubjects = [...subjects];
                                        newSubjects[i] = { ...newSubjects[i], subject_name: e.target.value };
                                        setSubjects(newSubjects);
                                    }
                                    } required>
                                        <option value="">Select Subject</option>
                                        {courses.map((course) => {
                                            if (course._id === data.course_id) {
                                                return course.subjects.map((subject, i) => (
                                                    <option key={i} value={subject._id}>{subject}</option>
                                                ))
                                            }
                                        })}
                                    </select>

                                </label>
                                <label htmlFor="total_marks">Total Marks <span className="text-gray-500">*</span>
                                    <input type="number" id="total_marks" name="total_marks" placeholder="Total Marks" value={subjects[i].total_marks} onChange={(e) => {
                                        const newSubjects = [...subjects];
                                        newSubjects[i] = { ...newSubjects[i], total_marks: e.target.value };
                                        setSubjects(newSubjects);
                                    }} required />
                                </label>
                                <label htmlFor="exam_date">Exam Date <span className="text-gray-500">*</span>
                                    <input type="date" id="exam_date" name="exam_date" value={subjects[i].exam_date} onChange={(e) => {
                                        const newSubjects = [...subjects];
                                        newSubjects[i] = { ...newSubjects[i], exam_date: e.target.value };
                                        setSubjects(newSubjects);
                                    }} required />
                                </label>
                                <label htmlFor="exam_time">Exam Time <span className="text-gray-500">*</span>
                                    <input type="time" id="exam_time" name="exam_time" value={subjects[i].exam_time} onChange={(e) => {
                                        const newSubjects = [...subjects];
                                        newSubjects[i] = { ...newSubjects[i], exam_time: e.target.value };
                                        setSubjects(newSubjects);
                                    }} required />
                                </label>
                            </div>
                            <button type="button" className="text-5xl text-red-600" onClick={(e) => {
                                const newSubjects = [...subjects];
                                newSubjects.splice(i, 1);
                                setSubjects(newSubjects);
                            }}><LuDelete /></button>
                        </div>
                    ))}
                </div>
                <Toaster />
                <button className="bg-blue-500 hover:bg-blue-600 text-white mt-5 py-3 px-7 rounded-3xl" type="submit">Create Exam</button>
            </form>
        </>
    )
}
