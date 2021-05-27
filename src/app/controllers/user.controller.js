import { doctumentsToObjects, doctumentToObject } from '../../util/mongoose.js';
import { CourseModel, CourseLevelModel } from '../models/course.model.js';
import { AuthorModel } from '../models/author.model.js';

// Utils
import { sassRenderToCss } from '../../util/sass.js';
import AppRoot from '../../util/app.js';

const UserController = {
    /**
     * PAGES
     */
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

        let opsFormDialogDelete = {
            selector: 'modal__dialog',
            class: 'form-dialog',
            type: 'warn',
        };
        let cssRender = sassRenderToCss(
            'base',
            `showDialog("${opsFormDialogDelete.selector}","${opsFormDialogDelete.class}","${opsFormDialogDelete.type}");`,
        );
        console.log(cssRender);
        res.render('users/courses/index', {
            idUser,
            courses,
            cssRender,
            opsFormDialogDelete,
        });
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
            .then((docs) => {
                res.render('users/courses/create', {
                    idUser: req.params?.idUser,
                    levels: doctumentsToObjects(docs),
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

    /**
     * APIS
     *
     * Url: /:idUser/courses/api
     */
    // [POST]
    async courseAdd(req, res, next) {
        const idUser = req.params?.idUser;
        let course = req?.body;
        await AuthorModel.findById(idUser)
            .then((doc) => {
                course['author'] = doctumentToObject(doc);
            })
            .catch(next);
        await CourseLevelModel.findById(course?.level)
            .then((doc) => {
                course['level'] = doctumentToObject(doc);
            })
            .catch(next);

        await new CourseModel(course)
            .save()
            .then((docSaved) => {
                docSaved = doctumentToObject(docSaved);
                res.redirect(`/user/${idUser}/courses/page/`);
            })
            .catch(next);
    },
    // [PUT]
    async courseUpdate(req, res, next) {
        const idUser = req.params?.idUser;
        const idCourse = req.params?.idCourse;
        const course = req?.body;
        await CourseLevelModel.findById(course?.level)
            .then((doc) => {
                course['level'] = doctumentToObject(doc);
            })
            .catch(next);
        await CourseModel.findByIdAndUpdate(idCourse, course)
            .then(() => {
                res.redirect(`/user/${idUser}/courses/page/`);
            })
            .catch(next);
    },
    // [DELETE]
    async courseDelete(req, res, next) {
        const idUser = req.params?.idUser;
        const idCourse = req.params?.idCourse;
        await CourseModel.findByIdAndDelete(idCourse)
            .then(() => {
                res.redirect(`/user/${idUser}/courses/page`);
            })
            .catch(next);
    },
};

export default UserController;
