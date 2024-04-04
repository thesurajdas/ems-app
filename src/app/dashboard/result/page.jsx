"use client";
import { useEffect, useState } from "react";
import MarkSheet from "@/components/Marksheet";

export default function ResultPage() {
    const [results, setResults] = useState();
    const [showResult, setShowResult] = useState(false);
    const [resultsData, setResultsData] = useState({});
    const handleView = (results) => {
        setResultsData({
            result_course: results.course_id,
            result_semester: results.semester,
            result_marks: results.marks,
        })
        setShowResult(!showResult)
        console.log(resultsData)
    };
    useEffect(() => {
        const course_id = "65fc45581bd9c281c805197f"; //Make it dynamic
        const semester = 1; //Make it dynamic
        const fecthData = async (id) => {
            const res = await fetch(`http://localhost:3000/api/results?course_id=${course_id}&semester=${semester}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                cache: "no-cache"
            });
            const data = await res.json();
            console.log(data.results)
            setResults(data.results);
        };
        fecthData(course_id, semester);
    }, []);
    return (
        <>
            <h1 className="my-4">Results</h1>
            <div className="">
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
                                <td><button onClick={(e) => handleView(results)} className="bg-yellow-500 hover:bg-yellow-600 py-2 px-4 rounded">{(showResult) ? "Hide" : "View"}</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showResult && <MarkSheet data={resultsData} />}
        </>
    )
}
