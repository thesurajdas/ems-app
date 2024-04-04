import connectMongoDB from "@/libs/mongodb";
import Results from "@/models/results";
import { NextResponse } from "next/server";

export async function GET(request) {
    const student_id = request.nextUrl.searchParams.get("student") || "";
    const course_id = request.nextUrl.searchParams.get("course") || "";
    const semester = request.nextUrl.searchParams.get("semester") || "";
    if (course_id && semester) {
        await connectMongoDB();
        const results = await Results.find({ course_id, semester, student_id });
        return NextResponse.json({ results }, { status: 200 });
    }
    await connectMongoDB();
    const results = await Results.find();
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