import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, lowercase: true },
        password: { type: String, required: true },
        role: { type: String, required: true, default: "student" },
        status: { type: String, required: true, default: "active" },
        mobile: { type: String, required: true },
        gender: { type: String, required: true },
        dob: { type: Date, required: true },
        street: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        course: { type: mongoose.Schema.Types.ObjectId, ref: "Courses" },
        avatar: { type: String, required: true, default: "avatar.jpg" },
    },
    {
        timestamps: true,
    }
);

const Users = mongoose.models.Users || mongoose.model("Users", usersSchema);

export default Users;