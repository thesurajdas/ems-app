import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Users from "@/models/users";

export async function GET(request) {
    const req = request.nextUrl.searchParams;
    const name = req.get("q") || "";
    const page = Number(req.get("page")) || 1;
    const limit = Number(req.get("limit")) || 5;
    const skip = (page - 1) * limit;
    await connectMongoDB();
    const length = await Users.countDocuments({ name: { "$regex": name, "$options": "i" }});
    const users = await Users.find({ name: { "$regex": name, "$options": "i" } }).skip(skip).limit(limit);
    return NextResponse.json({ users, length }, { status: 200 });
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