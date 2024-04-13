"use client";
import { useEffect, useState } from "react";
import MarkSheet from "@/components/Marksheet";

export default function ResultPage() {
    const [results, setResults] = useState();
    const [showResult, setShowResult] = useState(false);
    const [resultsData, setResultsData] = useState({});
    const handleView = async (results) => {
        const res = await fetch(`http://localhost:3000/api/exams?exam=${results.exam_id}`, {
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
        })
        setShowResult(!showResult)
    };
    useEffect(() => {
        setResultsData({
            ...resultsData,
            student_name: "John Doe",
            student_id: "123456",
        })
        const course_id = "65fc45581bd9c281c805197f"; //Make it dynamic
        const semester = 1; //Make it dynamic
        const fecthData = async (id) => {
            const res = await fetch(`http://localhost:3000/api/results?course_id=${course_id}&semester=${semester}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                cache: "no-cache"
            });
            const data = await res.json();
            setResults(data.results);
            console.log(data.results)
        };
        fecthData(course_id, semester);
    }, []);

    return (
        <>
            <h1 className="my-4">Results</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th>Exam Name</th>
                            <th>Course</th>
                            <th>Semester</th>
                            <th>Academic Session</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results && results.map((result, index) => (
                            <tr key={index}>
                                <td>{result.exam_id}</td>
                                <td>{result.course_id}</td>
                                <td>Semester {result.semester}</td>
                                <td>{result.session}</td>
                                <td><button onClick={(e) => handleView(results[index])} className="bg-yellow-500 hover:bg-yellow-600 py-2 px-4 rounded">{(showResult) ? "Hide" : "View"}</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showResult && <MarkSheet data={resultsData} />}
        </>
    )
}
