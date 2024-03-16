import mongoose, { Schema } from "mongoose";

const examSchema = new Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    mode: { type: String, required: true },
    duration: { type: String, required: true },
    status: { type: String, required: true, default: "active" },
    courses: { type: Array, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    result_id: { type: mongoose.Schema.Types.ObjectId, ref: "Results" },
},
    {
        timestamps: true,
    }
);

const Exams = mongoose.models.Exams || mongoose.model("Exams", examSchema);