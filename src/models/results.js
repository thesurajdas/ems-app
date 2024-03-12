import mongoose, {Schema} from 'mongoose';

const resultSchema = new Schema({
    student_id: {type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true},
    exam_id: {type: mongoose.Schema.Types.ObjectId, ref: "Exams", required: true},
    course_id: {type: mongoose.Schema.Types.ObjectId, ref: "Courses", required: true},
    result_date: {type: Date, required: true},
    result_status: {type: String, required: true, default: "pending"},
},
    {
        timestamps: true,
    }
);

const Results = mongoose.models.Results || mongoose.model("Results", resultSchema);