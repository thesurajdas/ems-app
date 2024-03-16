import connectMongoDB from "@/libs/mongodb";
import Courses from "@/models/courses";
import { NextResponse } from "next/server";

export async function GET() {
    await connectMongoDB();
    const courses = await Courses.find();
    return NextResponse.json({ courses }, { status: 200 });
}