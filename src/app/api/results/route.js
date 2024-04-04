import connectMongoDB from "@/libs/mongodb";
import Results from "@/models/results";
import { NextResponse } from "next/server";


 export async function GET(request) {
    const student_id = request.nextUrl.searchParams.get("student_id");
    const course_id = request.nextUrl.searchParams.get("course_id");
    const semester = Number(request.nextUrl.searchParams.get("semester"));

    await connectMongoDB();

    let query = {};
    if (student_id) query.student_id = student_id;
    if (course_id) query.course_id = course_id;
    if (semester) query.semester = semester;

    const results = await Results.find(query);
    return NextResponse.json({ results }, { status: 200 });
}
export async function POST(request) {
    const data = await request.json();
    await connectMongoDB();
    await Results.create(data);
    return NextResponse.json({ message: "Result Created" }, { status: 201 });
}
export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Results.findByIdAndDelete(id);
    return NextResponse.json({ message: "Result deleted" }, { status: 200 });
}