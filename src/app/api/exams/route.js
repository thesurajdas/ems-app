import connectMongoDB from "@/libs/mongodb";
import Exams from "@/models/exams";
import { NextResponse } from "next/server";

export async function GET(request) {
    await connectMongoDB();
    const course_id = request.nextUrl.searchParams.get("course");
    const semester = request.nextUrl.searchParams.get("semester");
    const query = {};
    if (course_id) query.course_id = course_id;
    if (semester) query.semester = semester;
    const exams = await Exams.find({query});
    return NextResponse.json({ exams }, { status: 200 });
}
export async function POST(request) {
    const data = await request.json();
    await connectMongoDB();
    await Exams.create(data);
    return NextResponse.json({ message: "Exam Created" }, { status: 201 });
}
export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Exams.findByIdAndDelete(id);
    return NextResponse.json({ message: "Exam deleted" }, { status: 200 });
}