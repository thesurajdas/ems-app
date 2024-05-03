import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Users from "@/models/users";
import bcrypt from "bcryptjs";

export async function GET(request) {
    const req = request.nextUrl.searchParams;
    const student_id = req.get("student_id");
    const course_id = req.get("course_id");
    const semester = req.get("semester");
    const session = req.get("session");
    const role = req.get("role");

    await connectMongoDB();

    let query = {};
    if (student_id) query._id = student_id || "";
    if (course_id) query.course = course_id || "";
    if (semester) query.semester = Number(semester) || "";
    if (session) query.session = Number(session) || "";
    if (role) query.role = role || "";

    if (Object.keys(query).length > 0) {
        const users = await Users.find(query);
        return NextResponse.json({ users, length: users.length }, { status: 201 });
    }
    else {
        const name = req.get("q") || "";
        const page = Number(req.get("page")) || 1;
        const limit = Number(req.get("limit")) || 5;
        const skip = (page - 1) * limit;
        const length = await Users.countDocuments({ name: { "$regex": name, "$options": "i" } });
        const users = await Users.find({ name: { "$regex": name, "$options": "i" } }).skip(skip).limit(limit);
        return NextResponse.json({ users, length }, { status: 200 });
    }
}

export async function POST(request) {
    const data = await request.json();
    let password = await bcrypt.hash(data.password, 10);;
    await connectMongoDB();
    await Users.create({ ...data, password });
    return NextResponse.json({ message: "Users Created" }, { status: 201 });
}


export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Users.findByIdAndDelete(id);
    return NextResponse.json({ message: "Users deleted" }, { status: 200 });
}