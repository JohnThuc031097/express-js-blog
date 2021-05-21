import { doctumentToObject } from "../../util/mongoose.js";
import CourseModel from "../models/course.model.js";

const CourseController = {
    // [GET] /
    index(req, res, next) {
        res.render("home");
    },
    // [GET] /courses/:slug
    show(req, res, next) {
        CourseModel.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render("courses/show", {
                    course: doctumentToObject(course),
                });
            })
            .catch(next);
    },
};

export default CourseController;
