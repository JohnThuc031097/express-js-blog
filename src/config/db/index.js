import mongoose from 'mongoose';

import {
    CourseModel,
    CourseLevelModel,
} from '../../app/models/course.model.js';
import { AuthorModel } from '../../app/models/author.model.js';

export default (() => {
    return {
        connect: async (nameDb) => {
            try {
                await mongoose.connect(`mongodb://localhost:27017/${nameDb}`, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useFindAndModify: false,
                    useCreateIndex: true,
                });
                console.log('[MongoDB] -> [Success] Connected!');
                return true;
            } catch (err) {
                console.log('[MongoDB] -> [Error] ', err);
            }
            return false;
        },
        init: () => {
            // Author
            const authors = [];
            authors.push(
                new AuthorModel({
                    firstName: 'Thức',
                    lastName: 'Nguyễn',
                    username: 'admin',
                    password: 'admin',
                    coin: 1200,
                }),
            );
            authors.push(
                new AuthorModel({
                    firstName: 'Thức',
                    lastName: 'Nguyễn',
                    username: 'user',
                    password: 'user',
                    coin: 500,
                }),
            );

            // Course level
            const courseLevels = [];
            courseLevels.push(
                new CourseLevelModel({
                    name: 'Basic',
                }),
            );
            courseLevels.push(
                new CourseLevelModel({
                    name: 'Advanced',
                }),
            );
            courseLevels.push(
                new CourseLevelModel({
                    name: 'Master',
                }),
            );

            // Course
            const courses = [];
            courses.push(
                new CourseModel({
                    name: 'Kiến thức cơ bản, cốt lõi dân IT cần học trước',
                    mediaId: 'M62l1xA5Eu8',
                    description:
                        'Kiến thức cơ bản dành cho dân IT, không phân biệt bạn theo Front-end, Back-end hay Devops',
                    level: courseLevels[0],
                    author: authors[0],
                }),
            );
            courses.push(
                new CourseModel({
                    name: 'HTML, CSS từ Zero đến Hero',
                    mediaId: 'R6plN3FvzFY',
                    description:
                        'Khóa học đề cao việc thực hành qua những ví dụ trong thực tế giúp học viên nhanh chóng xây dựng được giao diện website',
                    level: courseLevels[1],
                    author: authors[1],
                }),
            );
            courses.push(
                new CourseModel({
                    name: 'Xây dựng web responsive',
                    mediaId: 'uz5LIP85J5Y',
                    description:
                        'Khóa học này sẽ giúp bạn nắm chắc tư tưởng cốt lõi của việc xây dựng giao diện website responsive và áp dụng trong thực tế',
                    level: courseLevels[2],
                    author: authors[0],
                }),
            );

            return (() => {
                try {
                    [authors, courseLevels].forEach((docs) => {
                        docs.forEach(async (doc) => await doc.save());
                    });
                    courses.forEach(async (doc) => {
                        await doc.save();
                    });
                    console.log('[Database] Init OK!');
                    return true;
                } catch (error) {
                    console.log('[Database] Init Error:', err);
                    return false;
                }
            })();
        },
    };
})();
