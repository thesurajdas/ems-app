import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Users from "@/models/users";

export async function GET(request) {
    const student_id = request.nextUrl.searchParams.get("student_id");
    const course_id = request.nextUrl.searchParams.get("course_id");
    const semester = Number(request.nextUrl.searchParams.get("semester"));
    const session = Number(request.nextUrl.searchParams.get("session"));

    await connectMongoDB();

    let query = {};
    if (student_id) query._id = student_id;
    if (course_id) query.course = course_id;
    if (semester) query.semester = semester;
    if (session) query.session = session;
    

    if (student_id !== null || course_id !== null || semester !== null) {
        const users = await Users.find(query);
        return NextResponse.json({ users, length: users.length }, { status: 200 });
    }

    const req = request.nextUrl.searchParams;
    const name = req.get("q") || "";
    const page = Number(req.get("page")) || 1;
    const limit = Number(req.get("limit")) || 5;
    const skip = (page - 1) * limit;
    const length = await Users.countDocuments({ name: { "$regex": name, "$options": "i" } });
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