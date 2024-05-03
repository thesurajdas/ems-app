import { NextResponse } from "next/server";
import Users from "@/models/users";
import connectMongoDB from "@/libs/mongodb";


export async function POST(req) {
    try {
        await connectMongoDB();
        const { email } = await req.json();
        const user = await Users.findOne({ email }).select("_id");
        console.log(user);
        return NextResponse.json({ user });
    } catch (error) {
        console.log(error)
    }

}
