import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import slug from 'mongoose-slug-updater';

mongoose.plugin(slug);

const Schema = mongoose.Schema;

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

const courseLevelSchema = new Schema(
    {
        type: { type: Number },
        name: { type: String, maxLength: 50 },
    },
    { timestamps: true },
);

// Add plugin
courseSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    indexFields: 'all',
});

const CourseModel = mongoose.model('course', courseSchema);
const CourseLevelModel = mongoose.model('course-level', courseLevelSchema);

export { CourseModel, CourseLevelModel };
