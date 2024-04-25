import connectMongoDB from "@/libs/mongodb";
import Results from "@/models/results";
import { NextResponse } from "next/server";

export async function GET(request) {
    const student_id = request.nextUrl.searchParams.get("student_id");
    const course_id = request.nextUrl.searchParams.get("course_id");
    const semester = Number(request.nextUrl.searchParams.get("semester"));
    const action = request.nextUrl.searchParams.get("action");

    await connectMongoDB();

    let query = {};
    if (student_id) query.student_id = student_id;
    if (course_id) query.course_id = course_id;
    if (semester) query.semester = semester;

    if (action === 'avg') {
        const averageMarks = await Results.aggregate([
            { $match: query },
            { $group: { _id: null, average: { $avg: "$percentage" } } }
        ]);

        return NextResponse.json({ averageMarks }, { status: 200 });
    } else {
        const results = await Results.find(query);
        return NextResponse.json({ results }, { status: 200 });
    }
}