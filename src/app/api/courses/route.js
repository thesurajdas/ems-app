import connectMongoDB from "@/libs/mongodb";
import Courses from "@/models/courses";
import { NextResponse } from "next/server";

export async function GET(request) {
    await connectMongoDB();
    const courses = await Courses.find();
    return NextResponse.json({ courses }, { status: 200 });
}
export async function POST(request) {
    const data = await request.json();
    await connectMongoDB();
    await Courses.create(data);
    return NextResponse.json({ message: "Courses Created" }, { status: 201 });
}
export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Users.findByIdAndDelete(id);
    return NextResponse.json({ message: "Course deleted" }, { status: 200 });
}