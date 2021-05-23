import { doctumentsToObjects, doctumentToObject } from "../../util/mongoose.js";
import { CourseModel, CourseLevelModel } from "../models/course.model.js";
import { AuthorModel } from "../models/author.model.js";

const UserController = {
    // [GET] /:id/course/
    async courses(req, res, next) {
        let user = {};
        let courses = [];
        await AuthorModel.findOne({ code: req.params?.id })
            .then((doc) => {
                user = doctumentToObject(doc);
            }).catch(next);
        await CourseModel.find({ author: user })
            .then((docs) => {
                courses = doctumentsToObjects(docs);
            }).catch(next);
        res.render('courses/index', { courses });
    },
    // [POST] /:id/courses/add
    async courseAdd(req, res, next) {
        await AuthorModel.findOne({ code: req.params?.id })
            .then((model) => {
                req.body['author'] = doctumentToObject(model);
            }).catch(next);
        await CourseLevelModel.findOne({ type: req.body?.level })
            .then((model) => {
                req.body['level'] = doctumentToObject(model);
            }).catch(next);
        const course = new CourseModel(req.body);
        await course.save().then(res.redirect(`/${req.params?.id}/courses`)).catch(next);
    },
};

export default UserController;
