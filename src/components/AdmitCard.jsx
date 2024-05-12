"use client";
import { dateFormat, convertTime } from '@/app/hooks/dateformat';
import { useReactToPrint } from 'react-to-print';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { LuDownload } from 'react-icons/lu';

export default function AdmitCard({ data }) {
    const componentRef = useRef();
    const printAdmitCard = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <>
            <div className="flex items-center justify-between my-4">
                <div className="text-gray-400">This is your admit card for the upcoming examination. Please read the instructions carefully.</div>
                <button onClick={printAdmitCard} className="bg-green-500 hover:bg-green-600 flex items-center py-2 px-4 rounded-full gap-1"> <LuDownload /> Download Admit</button>
            </div>
            <div ref={componentRef} className="bg-slate-200 dark:bg-slate-700 rounded-lg shadow-lg p-8 max-w-full">
                <div className="flex justify-between">
                    <div className="w-1/2 pr-4">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold mb-4">Admit Card</h1>
                            <p className="text-gray-500 font-semibold text-lg">Examination: {data.exam_name}</p>
                            <p className="text-gray-500 font-extralight">Date: {dateFormat(data.exam_start_date)}</p>
                        </div>
                        <div className="mb-8">
                            <p className="font-bold">Candidate Name:</p>
                            <p>Suraj Das</p>
                        </div>
                        <div className="mb-8">
                            <p className="font-bold">Roll Number:</p>
                            <p>123456</p>
                        </div>
                        <div className="mb-8">
                            <p className="font-bold">Degree:</p>
                            <p>MCA</p>
                        </div>
                        <div className="mb-8">
                            <p className="font-bold">Semester:</p>
                            <p>{data.exam_semester}</p>
                        </div>
                        <div className="mb-8">
                            <p className="font-bold">Exam Center:</p>
                            <p>{data.exam_location}</p>
                        </div>
                        <div className="mb-8">
                            <p className="font-bold">Instructions:</p>
                            <ul className="list-disc pl-5">
                                <li>Please bring this admit card along with a valid ID proof.</li>
                                <li>Electronic devices are strictly prohibited.</li>
                                <li>Reach the exam center 30 minutes before the reporting time.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-1/2 pl-4">
                        <div className="mb-8">
                            <p className="font-bold">Photo:</p>
                            <Image src="/avatar.jpg" alt="Candidate" width={150} height={150} className="rounded-2xl mx-auto" />
                        </div>
                        <div className="mb-8 overflow-auto">
                            <p className="font-bold mb-2">Paper Details:</p>
                            <table className="table-auto">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Paper Name</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.exam_subjects.map((subject, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{subject.subject_name}</td>
                                            <td>{dateFormat(subject.exam_date)}</td>
                                            <td>{convertTime(subject.exam_time)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
