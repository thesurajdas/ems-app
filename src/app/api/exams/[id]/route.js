import connectMongoDB from "@/libs/mongodb";
import Exams from "@/models/exams";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const data = await request.json();
  await connectMongoDB();
  await Exams.findByIdAndUpdate(id, data);
  return NextResponse.json({ message: "Exams updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const exams = await Exams.findOne({ _id: id });
  return NextResponse.json({ exams }, { status: 200 });
}