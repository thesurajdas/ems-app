import connectMongoDB from "@/libs/mongodb";
import Results from "@/models/results";
import { NextResponse } from "next/server";

export async function GET(req) {
    const student_id = req.nextUrl.searchParams.get("student_id");
    const semester = req.nextUrl.searchParams.get("semester");
    const session = req.nextUrl.searchParams.get("session");
    const students = req.nextUrl.searchParams.get("students");
    await connectMongoDB();

    let query = {};
    if (student_id) query.student_id = student_id;
    if (semester) query.semester = semester;
    if (session) query.session = session;

    if (student_id !== null) {
        const res = await Results.find(query);
        const chartData = {
            labels: res[0].marks.map(r => r.subject_name),
            datasets: [
                {
                    label: 'Total Marks',
                    data: res[0].marks.map(m => m.total_marks),
                },
                {
                    label: 'Obtained Marks',
                    data: res[0].marks.map(m => m.obtained_marks),
                },
            ]
        };
        return NextResponse.json({ chartData }, { status: 200 });

    }
    if (students !== null) {
        const res = await Results.find();
        const passCounts = {};
        const failCounts = {};

        res.forEach(result => {
            const session = result.session;
            const resultType = result.result;

            if (resultType === "Pass") {
            passCounts[session] = (passCounts[session] || 0) + 1;
            } else if (resultType === "Fail") {
            failCounts[session] = (failCounts[session] || 0) + 1;
            }
        });

        const sortedSessions = Object.keys(passCounts).sort();
        const chartData = {
            labels: sortedSessions,
            datasets: [
            {
                label: 'Total Passed Students',
                data: sortedSessions.map(session => passCounts[session]),
            },
            {
                label: 'Total Failed Students',
                data: sortedSessions.map(session => failCounts[session]),
            },
            ],
        };

        return NextResponse.json({ chartData }, { status: 200 });
    }
    return NextResponse.json({ message: "Invalid Request" }, { status: 400 });
}