import mongoose from "mongoose";
import slug from "mongoose-slug-updater";

const Schema = mongoose.Schema;
mongoose.plugin(slug);

const courseSchema = new Schema({
    name: { type: String, maxLength: 255 },
    slug: { type: String, slug: 'name', unique: true },
    description: { type: String, maxLength: 600 },
    mediaId: { type: String, maxLength: 255 },
    level: [{ type: Schema.Types.ObjectId, ref: 'courses-level' }],
    author: [{ type: Schema.Types.ObjectId, ref: 'authors' }],
}, { timestamps: true, });

const courseLevelSchema = new Schema({
    type: { type: Number },
    name: { type: String, maxLength: 50 },
}, { timestamps: true, });

const CourseModel = mongoose.model("courses", courseSchema);
const CourseLevelModel = mongoose.model("courses-level", courseLevelSchema);

export {
    CourseModel,
    CourseLevelModel,
}

