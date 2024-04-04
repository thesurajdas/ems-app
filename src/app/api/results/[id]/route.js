import connectMongoDB from "@/libs/mongodb";
import Results from "@/models/results";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const data = await request.json();
  await connectMongoDB();
  await Results.findByIdAndUpdate(id, data);
  return NextResponse.json({ message: "Results updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const results = await Results.findOne({ _id: id });
  return NextResponse.json({ results }, { status: 200 });
}