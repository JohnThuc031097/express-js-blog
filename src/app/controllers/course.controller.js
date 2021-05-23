import { doctumentsToObjects, doctumentToObject } from "../../util/mongoose.js";
import { CourseModel, CourseLevelModel } from "../models/course.model.js";
import { AuthorModel } from "../models/author.model.js";

const CourseController = {
    // [GET] /
    index(req, res, next) {
        res.render("courses/index");
    },
    // [GET] /courses/:slug
    show(req, res, next) {
        CourseModel.findOne({ keyword: req.params?.slug })
            .then((course) => {
                res.render("courses/show", {
                    course: doctumentToObject(course),
                });
            })
            .catch(next);
    },
    // [GET] /course/create
    create(req, res, next) {
        CourseLevelModel.find({})
            .then(level => {
                res.render("courses/create", { level: doctumentsToObjects(level) });
            })
            .catch(next);
    },
    // [POST] /course/store/add
    async storeAdd(req, res, next) {
        await AuthorModel.findOne({ username: 'johnthuc1997' })
            .then((model) => {
                req.body['author'] = doctumentToObject(model);
            }).catch(next);
        await CourseLevelModel.findOne({ type: req.body?.level })
            .then((model) => {
                req.body['level'] = doctumentToObject(model);
            }).catch(next);
        const course = new CourseModel(req.body);
        await course.save().then(res.redirect('/')).catch(next);
    },
};

export default CourseController;
