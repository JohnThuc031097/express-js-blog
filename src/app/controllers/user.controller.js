import { doctumentsToObjects, doctumentToObject } from '../../util/mongoose.js';
import { CourseModel, CourseLevelModel } from '../models/course.model.js';
import { AuthorModel } from '../models/author.model.js';

const UserController = {
    // [GET] /:idUser/course/page
    async coursePageIndex(req, res, next) {
        const idUser = req.params?.idUser;
        let courses = [];
        await CourseModel.find({ author: idUser })
            .populate('author')
            .populate('level')
            .then((docs) => {
                courses = doctumentsToObjects(docs);
            })
            .catch(next);
        res.render('users/courses/index', { idUser, courses });
    },
    // [GET] /:idUser/courses/page/detail/:idCourse
    async coursePageDetail(req, res, next) {
        await CourseModel.findById(req.params?.idCourse)
            .then((course) => {
                res.render('users/courses/detail', {
                    course: doctumentToObject(course),
                });
            })
            .catch(next);
    },
    // [GET] /:idUser/courses/page/create
    async coursePageCreate(req, res, next) {
        await CourseLevelModel.find({})
            .then((level) => {
                res.render('users/courses/create', {
                    idUser: req.params?.idUser,
                    level: doctumentsToObjects(level),
                });
            })
            .catch(next);
    },
    // [GET] /:idUser/courses/page/edit/:idCourse
    async coursePageEdit(req, res, next) {
        let idCourse = req.params?.idCourse;
        let idUser = req.params?.idUser;
        let course = {};
        let levels = [];
        await CourseModel.findById(idCourse)
            .then((doc) => {
                course = doctumentToObject(doc);
            })
            .catch(next);
        await CourseLevelModel.find({})
            .then((docs) => {
                levels = doctumentsToObjects(docs);
            })
            .catch(next);
        res.render('users/courses/edit', { idUser, levels, course });
    },

    // [POST] /:idUser/courses/api/add
    async courseAdd(req, res, next) {
        const idUser = req.params?.idUser;
        await AuthorModel.findOne({ code: idUser })
            .then((doc) => {
                req.body['author'] = doctumentToObject(doc);
            })
            .catch(next);
        await CourseLevelModel.findOne({ type: req.body?.level })
            .then((doc) => {
                req.body['level'] = doctumentToObject(doc);
            })
            .catch(next);

        const course = new CourseModel(req.body);
        await course
            .save()
            .then((docSaved) => {
                docSaved = doctumentToObject(docSaved);
                res.redirect(
                    `/user/${userCode}/courses/page/detail/${docSaved?.slug}`,
                );
            })
            .catch(next);
    },
    // [POST] /:idUser/courses/api/update/:idCourse
    async courseUpdate(req, res, next) {
        const idUser = req.params?.idUser;
        const idCourse = req.params?.idCourse;
        const course = req?.body;
        await CourseLevelModel.findById(course?.level)
            .then((doc) => {
                course['level'] = doctumentToObject(doc);
            })
            .catch(next);
        let courseUpdated = await CourseModel.findByIdAndUpdate(
            idCourse,
            course,
            { new: true },
        );
        // res.redirect(`/user/${idUser}/courses/page/detail/${courseUpdated._id}`);
        res.redirect(`/user/${idUser}/courses/page/`);
    },
    // [POST] /:idUser/courses/api/delete/:idCourse
    async courseDelete(req, res, next) {
        const idUser = req.params?.idUser;
        const idCourse = req.params?.idCourse;
        await CourseModel.findByIdAndDelete(idCourse)
            .then((doc) => {
                res.redirect(`/user/${idUser}/courses/page`);
            })
            .catch(next);
    },
};

export default UserController;
