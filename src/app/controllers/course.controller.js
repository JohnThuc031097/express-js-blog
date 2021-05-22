import { doctumentToObject } from "../../util/mongoose.js";
import { CourseModel } from "../models/course.model.js";

const CourseController = {
    // [GET] /
    index(req, res, next) {
        res.render("home");
    },
    // [GET] /courses/:slug
    show(req, res, next) {
        CourseModel.findOne({ keyword: req.params?.keyword })
            .then((course) => {
                res.render("courses/show", {
                    course: doctumentToObject(course),
                });
            })
            .catch(next);
    },
    // [GET] /course/create
    create(req, res, next) {
        res.render("courses/create");
    },
    // [POST] /course/store/add
    storeAdd(req, res, next) {
        const course = new CourseModel(req.body);
        course.save().then(res.render("home")).catch(next);
        // res.json(req.body);
    },
};

export default CourseController;
