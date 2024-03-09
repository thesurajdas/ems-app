import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
    course_name: { type: String, required: true },
    course_code: { type: String, required: true, unique: true },
    course_type: { type: String, required: true },
    course_duration: { type: String, required: true },
    course_fee: { type: Number, required: true },
    course_status: { type: String, required: true, default: "active" },
    course_type: { type: String, required: true, default: "full-time" },
},
    {
        timestamps: true,
    }
);

const Courses = mongoose.models.Courses || mongoose.model("Courses", courseSchema);

export default Courses;