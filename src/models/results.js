import mongoose, { Schema } from 'mongoose';

const resultSchema = new Schema({
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    exam_id: { type: mongoose.Schema.Types.ObjectId, ref: "Exams", required: true },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: "Courses", required: true },
    result_date: { type: Date, required: true },
    marks: [{
        subject: { type: String, required: true },
        total_marks: { type: Number, required: true, min: 0, max: 100 },
        passing_marks: { type: Number, required: true, min: 0, max: 100 },
        obtained_marks: { type: Number, required: true, min: 0, max: 100 },
    }]
},
    {
        timestamps: true,
    }
);

const Results = mongoose.models.Results || mongoose.model("Results", resultSchema);
export default Results;