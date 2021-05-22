import mongoose from "mongoose";
import { CourseModel, CourseLevelModel } from "./course.model.js";
import { AuthorModel } from "./author.model.js";

const Schema = mongoose.Schema;

// Author
const authors = [];
authors.push(new AuthorModel({
  firstName: 'Thức',
  lastName: 'Nguyễn',
  username: 'johnthuc1997',
  password: '031097',
  coin: 1200,
}))

// Course level
const courseLevels = [];
courseLevels.push(new CourseLevelModel({
  type: 0,
  name: 'Basic'
}));
courseLevels.push(new CourseLevelModel({
  type: 1,
  name: 'Advanced'
}));
courseLevels.push(new CourseLevelModel({
  type: 2,
  name: 'Master'
}));

// Course
const courses = [];
courses.push(new CourseModel({
  name: 'Kiến thức cơ bản, cốt lõi dân IT cần học trước',
  keyword: 'lessons-for-newbie',
  mediaId: 'M62l1xA5Eu8',
  description: 'Kiến thức cơ bản dành cho dân IT, không phân biệt bạn theo Front-end, Back-end hay Devops',
  level: courseLevels[0],
  author: authors[0],
}));
courses.push(new CourseModel({
  name: 'HTML, CSS từ Zero đến Hero',
  keyword: 'html-css',
  mediaId: 'R6plN3FvzFY',
  description: 'Khóa học đề cao việc thực hành qua những ví dụ trong thực tế giúp học viên nhanh chóng xây dựng được giao diện website',
  level: courseLevels[1],
  author: authors[0],
}));
courses.push(new CourseModel({
  name: 'Xây dựng web responsive',
  keyword: 'responsive-web-design',
  mediaId: 'uz5LIP85J5Y',
  description: 'Khóa học này sẽ giúp bạn nắm chắc tư tưởng cốt lõi của việc xây dựng giao diện website responsive và áp dụng trong thực tế',
  level: courseLevels[2],
  author: authors[0],
}));

export default () => {
  try {
    [authors, courseLevels, courses].forEach(docs => {
      docs.forEach(async (doc) => await doc.save());
    });
    console.log('Init OK!');
    return true;
  } catch (error) {
    console.log('Init Error:', err);
    return false;
  }
};
