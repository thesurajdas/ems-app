"use client";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
export default function Exams() {
    const [creating, setCreating] = useState(false);
    const [courses, setCourses] = useState([]);
    const [data, setData] = useState({
        name: "",
        mode: "",
        location: "",
        duration: "",
        status: "",
        start_date: "",
        end_date: "",
        marks_per_subject: "",
    });
    const resetForm = () => {
        setData({
            name: "",
            mode: "",
            duration: "",
            status: "",
            start_date: "",
            end_date: "",
            marks_per_subject: "",
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

        const createExam = async (e) => {
            e.preventDefault();
            console.log(data);
            const res = await fetch('http://localhost:3000/api/exams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const datar = await res.json();
            console.log(datar)
            toast.success("Exam created successfully!");
            resetForm();
        }
        return (
            <>
                <h1>Exams</h1>

                <form onSubmit={createExam}>
                    <div className="container w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 rounded py-4">
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
                        <label htmlFor="duration">Duration (Hours) <span className="text-gray-500">*</span>
                            <input type="number" id="duration" name="duration" placeholder="Exam Duration" value={data.duration} onChange={(e) => setData({ ...data, duration: e.target.value })} required />
                        </label>
                        <label htmlFor="status">Status <span className="text-gray-500">*</span>
                            <select id="status" name="status" value={data.status} onChange={(e) => setData({ ...data, status: e.target.value })} required>
                                <option value="">Select Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </label>
                        <label htmlFor="start_date">Start Date <span className="text-gray-500">*</span>
                            <input type="date" id="start_date" name="start_date" value={data.start_date} onChange={(e) => setData({ ...data, start_date: e.target.value })} required />
                        </label>
                        <label htmlFor="end_date">End Date <span className="text-gray-500">*</span>
                            <input type="date" id="end_date" name="end_date" value={data.end_date} onChange={(e) => setData({ ...data, end_date: e.target.value })} required />
                        </label>
                        <label htmlFor="marks_per_subject">Marks Per Subject <span className="text-gray-500">*</span>
                            <input type="number" id="marks_per_subject" name="marks_per_subject" placeholder="eg. 100" value={data.marks_per_subject} onChange={(e) => setData({ ...data, marks_per_subject: e.target.value })} required />
                        </label>
                    </div>
                    <Toaster />
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-7 rounded-3xl" type="submit">Create Exam</button>
                </form>
            </>
        )
    }
