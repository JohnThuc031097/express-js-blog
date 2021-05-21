import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CourseModel = new Schema({
    name: { type: String, maxLength: 255 },
    description: { type: String, maxLength: 600 },
    slug: { type: String, maxLength: 255 },
    mediaId: { type: String, maxLength: 255 },
    level: { type: String, maxLength: 50 },
    author: { type: String, maxLength: 200 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Course", CourseModel);
