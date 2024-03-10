import connectMongoDB from "@/libs/mongodb";
import Users from "@/models/users";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const data = await request.json();
  await connectMongoDB();
  await Users.findByIdAndUpdate(id, data);
  return NextResponse.json({ message: "Users updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const user = await Users.findOne({ _id: id });
  return NextResponse.json({ user }, { status: 200 });
}