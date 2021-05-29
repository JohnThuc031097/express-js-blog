import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import slug from 'mongoose-slug-updater';

const Schema = mongoose.Schema;
mongoose.plugin(slug);

const courseSchema = new Schema(
    {
        name: { type: String, maxLength: 255 },
        slug: { type: String, slug: 'name', unique: true },
        description: { type: String, maxLength: 600 },
        mediaId: { type: String, maxLength: 255 },
        level: { type: Schema.Types.ObjectId, ref: 'course-level' },
        author: { type: Schema.Types.ObjectId, ref: 'author' },
    },
    { timestamps: true },
);
courseSchema.plugin(mongooseDelete, {
    overrideMethods: ['count', 'countDocuments', 'find'],
    indexFields: 'all',
});

const courseLevelSchema = new Schema(
    {
        type: { type: Number },
        name: { type: String, maxLength: 50 },
    },
    { timestamps: true },
);

const CourseModel = mongoose.model('course', courseSchema);
const CourseLevelModel = mongoose.model('course-level', courseLevelSchema);

export { CourseModel, CourseLevelModel };
