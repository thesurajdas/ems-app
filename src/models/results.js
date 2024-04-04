import mongoose, { Schema } from 'mongoose';

const resultSchema = new Schema({
    exam_id: { type: mongoose.Schema.Types.ObjectId, ref: "Exams", required: true },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: "Courses", required: true },
    semester: { type: Number, required: true },
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    marks: [{
        subject_name: { type: String, required: true },
        total_marks: { type: Number, required: true, min: 0, max: 100 },
        passing_marks: { type: Number, required: true, min: 0, max: 100 },
        obtained_marks: { type: Number, required: true, min: 0, max: 100 },
    }]
});

const Results = mongoose.models.Results || mongoose.model("Results", resultSchema);
export default Results;