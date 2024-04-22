import connectMongoDB from "@/libs/mongodb";
import Results from "@/models/results";
import { NextResponse } from "next/server";

export async function GET(req) {
    const student_id = req.nextUrl.searchParams.get("student_id");
    const semester = req.nextUrl.searchParams.get("semester");
    await connectMongoDB();

    let query = {};
    if (student_id) query.student_id = student_id;
    if (semester) query.semester = semester;

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
}