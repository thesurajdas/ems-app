import mongoose, { Schema } from "mongoose";

const examSchema = new Schema({
    name: { type: String, required: true },
    mode: { type: String, required: true },
    duration: { type: String, required: true },
    status: { type: String, required: true, default: "active" },
    location: { type: String, required: true },
    result_status: { type: String, required: true, default: "pending" },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: "Courses" },
    semester: [{ type: Number, required: true }],
    subject_details: [{
        subject_name: { type: String, required: true },
        total_marks: { type: Number, required: true },
        exam_date: { type: Date, required: true },
        exam_time: { type: String, required: true },
    }],
});

const Exams = mongoose.models.Exams || mongoose.model("Exams", examSchema);

export default Exams;