"use client";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { LuDownload } from 'react-icons/lu';
import { LiaUniversitySolid } from "react-icons/lia";

export default function MarkSheet({ data }) {
    const getGrade = (obtained_marks, total_marks) => {
        const percentage = (obtained_marks / total_marks) * 100;
        if (percentage >= 90) {
            return "A+";
        } else if (percentage >= 80) {
            return "A";
        } else if (percentage >= 70) {
            return "B+";
        } else if (percentage >= 60) {
            return "B";
        } else if (percentage >= 50) {
            return "C+";
        } else if (percentage >= 40) {
            return "C";
        } else if (percentage >= 30) {
            return "D";
        } else {
            return <b className="text-red-500">F</b>;
        }
    }
    const componentRef = useRef();
    const printMarkSheet = useReactToPrint({
        content: () => componentRef.current,
    });
    return (
        <>
            <div className="flex items-center justify-between my-4">
                <div className="text-gray-400">This is your marksheet.</div>
                <button onClick={printMarkSheet} className="bg-green-500 hover:bg-green-600 flex items-center py-2 px-4 rounded-full gap-1"> <LuDownload /> Download Marksheet</button>
            </div>
            <div ref={componentRef} className="bg-slate-200 dark:bg-slate-700 rounded-lg shadow-lg p-8 max-w-full">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20">
                            <LiaUniversitySolid className='text-7xl' />
                        </div>
                        <div className=''>
                            <h1 className="text-2xl font-bold">Adamas University</h1>
                            <p className="text-sm text-gray-400">Kolkata, West Bengal, India</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">Mark Sheet</h1>
                    <div className="flex items-center justify-center gap-4 mb-3">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <label>Student Name:</label>
                                <span>{data.student_name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <label>Student ID:</label>
                                <span>{data.student_id}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <label>Course:</label>
                                <span>{data.result_course}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <label>Semester:</label>
                                <span>{data.result_semester}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <label>Session:</label>
                                <span>{data.exam_session}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <label>Exam Mode:</label>
                                <span>{data.exam_mode}</span>
                            </div>
                        </div>
                    </div>
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Total Marks</th>
                                <th>Obtained Marks</th>
                                <th>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.result_marks.map((mark, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{mark.subject_name}</td>
                                        <td>{mark.total_marks}</td>
                                        <td>{mark.obtained_marks}</td>
                                        <td>{getGrade(mark.obtained_marks, mark.total_marks)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div className="flex items-center justify-end gap-4">
                        <div className="flex items-center gap-2">
                            <label>Total Marks:</label>
                            <span>{data.total_marks}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <label>Obtained Marks:</label>
                            <span>{data.obtained_marks}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <label>Total Grade:</label>
                            <span>{getGrade(data.obtained_marks, data.total_marks)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <label>Percentage:</label>
                            <span>{((data.obtained_marks / data.total_marks) * 100).toFixed(2)} %</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <label>Result:</label>
                            <span>{(((data.obtained_marks / data.total_marks) * 100).toFixed(2)>data.pass_percent)?"Pass":"Fail"}</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-start gap-4">
                        <p className='text-sm font-extralight'>Disclaimer: This is a computer generated marksheet and does not require any signature.</p>
                    </div>
                </div>
            </div>
        </>
    )
}
