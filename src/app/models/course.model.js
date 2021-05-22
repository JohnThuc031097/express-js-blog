import mongoose from "mongoose";

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: { type: String, maxLength: 255 },
    description: { type: String, maxLength: 600 },
    keyword: { type: String, maxLength: 255 },
    mediaId: { type: String, maxLength: 255 },
    level: [{ type: Schema.Types.ObjectId, ref: 'courses-level' }],
    author: [{ type: Schema.Types.ObjectId, ref: 'authors' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const courseLevelSchema = new Schema({
    type: { type: Number },
    name: { type: String, maxLength: 50 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const CourseModel = mongoose.model("courses", courseSchema);
const CourseLevelModel = mongoose.model("courses-level", courseLevelSchema);

export {
    CourseModel,
    CourseLevelModel,
}

