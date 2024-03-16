import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    degree: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    subjects: [ { type: Array, required: true, default: [] } ]
},
    {
        timestamps: true,
    }
);

const Courses = mongoose.models.Courses || mongoose.model("Courses", courseSchema);

export default Courses;