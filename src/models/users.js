import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
    {
        course_name: { type: String, required: true },
        course_code: { type: String, required: true },
        course_duration: { type: String, required: true },
        course_fee: { type: Number, required: true },
        course_status: { type: String, required: true, default: "active" },
        course_start_date: { type: Date, required: true },
        course_end_date: { type: Date, required: true },
        course_type: { type: String, required: true, default: "full-time" },
        course_description: { type: String, required: false },
        course_lecturer: [{ type: String, required: true }]
    },
    {
        timestamps: true,
    }
);


const usersSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, lowercase: true },
        password: { type: String, required: true },
        role: { type: String, required: true, default: "student"},
        status: { type: String, required: true, default: "active"},
        reg_no: { type: String, required: true },
        roll_no: { type: String, required: true },
        mobile_no: { type: Number, required: true },
        gender: { type: String, required: true },
        date_of_birth: { type: Date, required: true },
        profile_pic: { type: String, required: true, default: "avatar.jpg" },
        address: {
            street: { type: String, required: true },
            state: { type: String, required: true },
            country: { type: String, required: true }
        },
        course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }
    },
    {
        timestamps: true,
    }
);

const Users = mongoose.models.Users || mongoose.model("Users", usersSchema);

export default Users;