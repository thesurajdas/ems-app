"use client";
import { useEffect, useState } from "react";
import MarkSheet from "@/components/Marksheet";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function ResultPage() {
    const { data: session } = useSession();
    const [results, setResults] = useState();
    const [showResult, setShowResult] = useState(false);
    const [resultsData, setResultsData] = useState({});
    const handleView = async (results) => {
        const res = await fetch(`http://localhost:3000/api/exams?exam_id=${results.exam_id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-cache"
        });
        const data = await res.json();
        const res2 = await fetch(`http://localhost:3000/api/courses?id=${data.exam.course_id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-cache"
        });
        const data2 = await res2.json();
        const total_marks = results.marks.reduce((acc, mark) => acc + mark.total_marks, 0);
        const obtained_marks = results.marks.reduce((acc, mark) => acc + mark.obtained_marks, 0);
        setResultsData({
            ...resultsData,
            result_course: data2.course.code,
            exam_name: data.exam.name,
            exam_session: data.exam.session,
            exam_mode: data.exam.mode,
            result_semester: results.semester,
            total_marks: total_marks,
            obtained_marks: obtained_marks,
            result_marks: results.marks,
            pass_percent: data.exam.pass_percent
        })
        setShowResult(!showResult)
    };
    useEffect(() => {
        setResultsData({
            ...resultsData,
            student_name: session?.user?.name,
            student_id: session?.user?._id,
        })
        const student_id = session?.user?._id;
        const fecthData = async (id) => {
            const res = await fetch(`http://localhost:3000/api/results?student_id=${student_id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                cache: "no-cache"
            });
            const data = await res.json();
            setResults(data.results);
            console.log(data.results)
        };
        fecthData(student_id);
    }, []);

    return (
        <>
            <h1 className="my-4">Results</h1>
            {session?.user?.role === "teacher" && <Link href='http://localhost:3000/dashboard/result/create'><button className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded my-4">Add Result</button></Link>}
            {session?.user?.role === "admin" && <Link href='http://localhost:3000/dashboard/result/create'><button className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded my-4">Add Result</button></Link>}
            {session?.user?.role === "student" &&
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                {/* <th>Exam Name</th>
                            <th>Course</th> */}
                                <th>Semester</th>
                                <th>Academic Session</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results && results.map((result, index) => (
                                <tr key={index}>
                                    {/* <td>{result.exam_id}</td>
                                <td>{result.course_id}</td> */}
                                    <td>Semester {result.semester}</td>
                                    <td>{result.session}</td>
                                    <td><button id={"button" + index} onClick={(e) => {
                                        handleView(results[index])
                                        if (document.getElementById("button" + index).textContent === "View") {
                                            document.getElementById("button" + index).textContent = "Hide"
                                        } else {
                                            document.getElementById("button" + index).textContent = "View"
                                        }
                                    }} className="bg-yellow-500 hover:bg-yellow-600 py-2 px-4 rounded">View</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
            {showResult && <MarkSheet data={resultsData} />}
        </>
    )
}
