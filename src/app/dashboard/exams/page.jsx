"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LuFileEdit } from 'react-icons/lu';

const ExamCard = ({ exam }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className="bg-slate-100 dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
            <div className="flex justify-between">
                <h2 className="text-4xl font-extralight">{exam.name}</h2>
                <Link href={'/dashboard/exams/edit/' + exam._id} className="bg-yellow-500 hover:bg-yellow-600 text-white h-fit p-2 rounded">
                    <LuFileEdit />
                </Link>
            </div>
            <p>Mode: {exam.mode}</p>
            <p>Status: {exam.status}</p>
            <p>Location: {exam.location}</p>
            <p>Result Status: {exam.result_status}</p>
            <p>Semester: {exam.semester}</p>
            <p>Session: {exam.session}</p>
            <button
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded"
                onClick={toggleDetails}
            >
                {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
            {showDetails && (
                <div className="mt-2 p-2 flex gap-2">
                    {exam.subject_details.map((subject) => (
                        <div className='border p-2 rounded' key={subject.subject_name}>
                            <p>Subject Name: {subject.subject_name}</p>
                            <p>Total Marks: {subject.total_marks}</p>
                            <p>Date: {subject.exam_date}</p>
                            <p>Time: {subject.exam_time}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default function ExamsPage() {
    const [exams, setExams] = useState([]);
    useEffect(() => {
        const fetchExams = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/exams', { cache: "no-store" });
                const data = await res.json();
                setExams(data.exams);
            } catch (error) {
                console.error('Error fetching exams data:', error);
            }
        };
        fetchExams();
    }, []);
    useEffect(() => {
        console.log(exams);
    }, [exams]);
    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Exams</h1>
            <div className="flex justify-end mb-4">
                <Link href="/dashboard/exams/create">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded">
                        Add Exam
                    </button>
                </Link>
            </div>
            <div className="container grid grid-cols-2">
                {exams.map((exam) => (
                    <ExamCard key={exam._id} exam={exam} />
                ))}
            </div>
        </div>
    );
};