import { doctumentsToObjects, doctumentToObject } from "../../util/mongoose.js";
import { CourseModel, CourseLevelModel } from "../models/course.model.js";
import { AuthorModel } from "../models/author.model.js";

const CourseController = {
    // [GET] /courses
    index(req, res, next) {
        CourseModel.find({})
            .then((courses) => {
                res.render("courses/index", {
                    course: doctumentsToObjects(courses),
                });
            })
            .catch(next);
    },
    // [GET] /courses/detail
    detail(req, res, next) {
        CourseModel.findOne({ slug: req.params?.slug })
            .then((course) => {
                res.render("courses/detail", {
                    course: doctumentToObject(course),
                });
            })
            .catch(next);
    },
};

export default CourseController;
