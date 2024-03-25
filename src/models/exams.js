import mongoose, { Schema } from "mongoose";

const examSchema = new Schema({
    name: { type: String, required: true },
    mode: { type: String, required: true },
    duration: { type: String, required: true },
    status: { type: String, required: true, default: "active" },
    location: { type: String, required: true },
    courses: { type: Array },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    marks_per_subject: { type: Number, required: true },
    result_id: { type: mongoose.Schema.Types.ObjectId, ref: "Results" },
});

const Exams = mongoose.models.Exams || mongoose.model("Exams", examSchema);

export default Exams;