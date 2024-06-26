import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
    qualification: { type: String, required: true },
    degree: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    subjects: [ { type: String, required: true} ]
});

const Courses = mongoose.models.Courses || mongoose.model("Courses", courseSchema);

export default Courses;