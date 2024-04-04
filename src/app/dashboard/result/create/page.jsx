"use client";
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from "react";

export default function CreateResultPage() {
    const [exams, setExams] = useState([]);
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        exam_id: '',
        student_id: '',
        course_id: '',
        semester: ""
    });
    const [subjectData, setSubjectData] = useState([]);
    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await fetch('/api/exams');
                if (!response.ok) {
                    throw new Error('Error fetching exams');
                }
                const data = await response.json();
                setExams(data.exams);
            } catch (error) {
                console.error('Error fetching exams:', error);
            }
        };
        const fetchStudents = async () => {
            try {
                const response = await fetch('/api/users');
                if (!response.ok) {
                    throw new Error('Error fetching students');
                }
                const data = await response.json();
                setStudents(data.users);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };
        fetchExams();
        fetchStudents();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/results', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...formData, marks: subjectData })
            });

            if (!response.ok) {
                throw new Error('Error adding result');
            }
            toast.success('Result added successfully!');
            console.log('Result added successfully!');
            setFormData({
                student_id: '',
                exam_id: '',
                course_id: '',
                semester: ''
            });
            setSubjectData([]);
        } catch (error) {
            console.error('Error adding result:', error);
        }
    };

    useEffect(() => {
        console.log({ ...formData, marks: subjectData })
    }, [{ ...formData, marks: subjectData }]);
    return (
        <>
            <h1 className="my-4">Create Result</h1>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-3 gap-4">
                    <label htmlFor="exam_id">Exam ID <span className="text-gray-500">*</span>
                        <select id="exam_id" name="exam_id" value={formData.exam_id} onChange={(e) => {
                            setFormData({ ...formData, exam_id: e.target.value, course_id: exams.find(exam => exam._id === e.target.value).course_id, semester: exams.find(exam => exam._id === e.target.value).semester })
                            setSubjectData(exams.find(exam => exam._id === e.target.value).subject_details.map((subject) => ({
                                subject_name: subject.subject_name,
                                total_marks: subject.total_marks,
                                passing_marks: 0,
                                obtained_marks: 0
                            })))
                        }} required>
                            <option value="">Select Exam</option>
                            {exams.map((exam) => (
                                <option key={exam._id} value={exam._id}>{exam.name}</option>
                            ))}
                        </select>
                    </label>
                    <label htmlFor="student_id">Student ID <span className="text-gray-500">*</span>
                        <select id="student_id" name="student_id" value={formData.student_id} onChange={(e) => setFormData({ ...formData, student_id: e.target.value })} required>
                            <option value="">Select Student</option>
                            {students.map((student) => (
                                <option key={student._id} value={student._id}>{student.name}</option>
                            ))}
                        </select>
                    </label>
                    {formData.semester && (
                        <label htmlFor="semester">Semester <span className="text-gray-500">*</span>
                            <input
                                type="number"
                                id="semester"
                                name="semester"
                                value={formData.semester}
                                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                                readOnly
                                required
                            />
                        </label>
                    )}
                </div>
                <div className="m-2">
                    <label htmlFor="marks">Marks <span className="text-gray-500">*</span>
                        {subjectData && subjectData.map((subject, index) => (
                            <div key={index} className="grid grid-cols-4 gap-4 mt-4">
                                <label htmlFor="subject">Subject <span className="text-gray-500">*</span>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={subject.subject_name}
                                        onChange={(e) => {
                                            const newSubjectData = [...subjectData];
                                            newSubjectData[index].subject_name = e.target.value;
                                            setSubjectData(newSubjectData);
                                        }}
                                        readOnly
                                        required
                                    />
                                </label>
                                <label htmlFor="total_marks">Total Marks <span className="text-gray-500">*</span>
                                    <input
                                        type="number"
                                        id="total_marks"
                                        name="total_marks"
                                        value={subject.total_marks}
                                        onChange={(e) => {
                                            const newSubjectData = [...subjectData];
                                            newSubjectData[index].total_marks = e.target.value;
                                            setSubjectData(newSubjectData);
                                        }}
                                        readOnly
                                        required
                                    />
                                </label>
                                <label htmlFor="passing_marks">Passing Marks <span className="text-gray-500">*</span>
                                    <input
                                        type="number"
                                        id="passing_marks"
                                        name="passing_marks"
                                        value={subject.passing_marks}
                                        onChange={(e) => {
                                            const newSubjectData = [...subjectData];
                                            newSubjectData[index].passing_marks = e.target.value;
                                            setSubjectData(newSubjectData);
                                        }}
                                        required
                                    />
                                </label>
                                <label htmlFor="obtained_marks">Obtained Marks <span className="text-gray-500">*</span>
                                    <input
                                        type="number"
                                        id="obtained_marks"
                                        name="obtained_marks"
                                        value={subject.obtained_marks}
                                        onChange={(e) => {
                                            const newSubjectData = [...subjectData];
                                            newSubjectData[index].obtained_marks = e.target.value;
                                            setSubjectData(newSubjectData);
                                        }}
                                        required
                                    />
                                </label>
                            </div>
                        ))}
                    </label>
                </div>
                <Toaster />
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white mt-5 py-3 px-7 rounded-3xl">Submit</button>
            </form>
        </>
    );
}