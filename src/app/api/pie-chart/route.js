import connectMongoDB from "@/libs/mongodb";
import Results from "@/models/results";
import { NextResponse } from "next/server";

export async function GET(req) {
    const course_id = req.nextUrl.searchParams.get("course_id");
    const session = req.nextUrl.searchParams.get("session");
    const semester = req.nextUrl.searchParams.get("semester");

    await connectMongoDB();

    let query = {};
    if (semester) query.semester = semester;
    if (session) query.session = session;
    if (course_id) query.course_id = course_id;

    // count and return the number of passed and failed students

    const res = await Results.find(query);
    const chartData = {
        labels: ['Total Passed', 'Total Failed'],
        datasets: [
            {
                data: [
                    res.filter(r => r.result === 'Pass').length,
                    res.filter(r => r.result === 'Fail').length
                ]
            }
        ]
    };
    return NextResponse.json({ chartData }, { status: 200 });
}