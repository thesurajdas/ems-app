"use client";
import { useEffect, useState } from "react";
import AdmitCard from "@/components/AdmitCard";
import { dateFormat } from "@/app/hooks/dateformat";
import { useSession } from "next-auth/react";

export default function Admit() {
    const { data: session } = useSession();
    const course_id = session?.user?.course; //Make it dynamic
    const semester = session?.user?.semester; //Make it dynamic
    const sessionx = session?.user?.session;
    const [exams, setExams] = useState();
    const [showAdmit, setShowAdmit] = useState(false);
    const [admitData, setAdmitData] = useState({
        exam_name: "B.Tech 4th Semester",
        exam_course: "Computer Science",
        exam_semester: "Semester 4",
        exam_start_date: "2021-09-01",
        exam_location: "Kolkata",
        exam_subjects: [
            { name: "Mathematics", date: "2021-09-01", time: "10:00 AM" },
            { name: "Physics", date: "2021-09-02", time: "10:00 AM" },
            { name: "Chemistry", date: "2021-09-03", time: "10:00 AM" },
            { name: "Computer Science", date: "2021-09-04", time: "10:00 AM" },
            { name: "English", date: "2021-09-05", time: "10:00 AM" },
        ],
    });
    const handleView = (exam) => {
        setAdmitData({
            exam_name: exam.name,
            exam_course: exam.course_id,
            exam_semester: exam.semester,
            exam_start_date: exam.subject_details[0].exam_date,
            exam_location: exam.location,
            exam_subjects: exam.subject_details,
        })
        setShowAdmit(!showAdmit)
        console.log(admitData)
    };
    useEffect(() => {
        const fecthData = async (id) => {
            const res = await fetch(`/api/exams?course=${course_id}&semester=${semester}&session=${sessionx}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                cache: "no-cache"
            });
            const data = await res.json();
            console.log(data.exams)
            setExams(data.exams);
        };
        fecthData(course_id, semester);
    }, []);
    return (
        <>
            <h1 className="my-4">Your Admit Card</h1>
            <div className="">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th>Exam Name</th>
                            <th>Academic Session</th>
                            <th>Exam Start Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exams && exams.map((exam, index) => (
                            <tr key={index}>
                                <td>{exam.name}</td>
                                <td>Semester {exam.semester}</td>
                                <td>{dateFormat(exam.subject_details[0].exam_date)}</td>
                                <td><button onClick={(e) => handleView(exam)} className="bg-yellow-500 hover:bg-yellow-600 py-2 px-4 rounded">{(showAdmit) ? "Hide" : "Show"}</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showAdmit && <AdmitCard data={admitData} />}
        </>
    )
}
