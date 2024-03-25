import connectMongoDB from "@/libs/mongodb";
import Courses from "@/models/courses";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const data = await request.json();
  await connectMongoDB();
  await Courses.findByIdAndUpdate(id, data);
  return NextResponse.json({ message: "Courses updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const course = await Courses.findOne({ _id: id });
  return NextResponse.json({ course }, { status: 200 });
}