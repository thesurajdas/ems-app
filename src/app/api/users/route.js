import connectMongoDB from "@/libs/mongodb";
import Users from "@/models/users";
import { NextResponse } from "next/server";

export async function GET(request) {
    const req = request.nextUrl.searchParams;
    const name = req.get("name") || "";
    const page = Number(req.get("page")) || 1;
    const limit = Number(req.get("limit")) || 10;
    const skip = (page - 1) * limit;
    await connectMongoDB();
    const users = await Users.find({ name: { "$regex": name, "$options": "i" } }).skip(skip).limit(limit);
    return NextResponse.json({ users }, { status: 200 });
}

export async function POST(request) {
    const data = await request.json();
    await connectMongoDB();
    await Users.create(data);
    return NextResponse.json({ message: "Users Created" }, { status: 201 });
}


export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Users.findByIdAndDelete(id);
    return NextResponse.json({ message: "Users deleted" }, { status: 200 });
}