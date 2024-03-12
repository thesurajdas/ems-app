import mongoose, { Schema } from "mongoose";

const examSchema = new Schema({
    exam_name: { type: String, required: true },
    exam_code: { type: String, required: true, unique: true },
    exam_mode: { type: String, required: true },
    exam_duration: { type: String, required: true },
    exam_status: { type: String, required: true, default: "active" },
    exam_courses: { type: Array, required: true },
    exam_start_date: { type: Date, required: true },
    exam_end_date: { type: Date, required: true },
    exam_result_id: { type: mongoose.Schema.Types.ObjectId, ref: "Results" },
},
    {
        timestamps: true,
    }
);

const Exams = mongoose.models.Exams || mongoose.model("Exams", examSchema);