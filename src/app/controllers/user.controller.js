import { doctumentsToObjects, doctumentToObject } from '../../util/mongoose.js';
import { CourseModel, CourseLevelModel } from '../models/course.model.js';
import { AuthorModel } from '../models/author.model.js';

const UserController = {
    // [GET] /:id/course/page
    async coursePageIndex(req, res, next) {
        let user = {};
        let courses = [];
        await AuthorModel.findOne({ code: req.params?.id })
            .then((doc) => {
                user = doctumentToObject(doc);
            })
            .catch(next);
        await CourseModel.find({ author: user })
            .populate('author')
            .populate('level')
            .then((docs) => {
                courses = doctumentsToObjects(docs);
            })
            .catch(next);
        res.render('users/courses/index', { courses });
    },
    // [GET] /:id/courses/page/detail/:slug
    async coursePageDetail(req, res, next) {
        await CourseModel.findOne({ slug: req.params?.slug })
            .then((course) => {
                res.render('users/courses/detail', {
                    course: doctumentToObject(course),
                });
            })
            .catch(next);
    },
    // [GET] /:id/courses/page/create
    async coursePageCreate(req, res, next) {
        await CourseLevelModel.find({})
            .then((level) => {
                res.render('users/courses/create', {
                    code: req.params?.id,
                    level: doctumentsToObjects(level),
                });
            })
            .catch(next);
    },
    // [GET] /:id/courses/page/edit/:slug
    async coursePageEdit(req, res, next) {
        let slug = req.params?.slug;
        let code = req.params?.id;
        let course = {};
        let levels = [];
        await CourseModel.findOne({ slug })
            .then((doc) => {
                course = doctumentToObject(doc);
            })
            .catch(next);
        await CourseLevelModel.findOne({ _id: course.level })
            .then((doc) => {
                course['level'] = doctumentToObject(doc).type;
            })
            .catch(next);
        await CourseLevelModel.find({})
            .then((docs) => {
                levels = doctumentsToObjects(docs);
            })
            .catch(next);
        res.render('users/courses/edit', { code, slug, levels, course });
    },

    // [POST] /:id/courses/api/add
    async courseAdd(req, res, next) {
        const userCode = req.params?.id;
        await AuthorModel.findOne({ code: userCode })
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
    // [POST] /:id/courses/api/update/:slug
    async courseUpdate(req, res, next) {
        const code = req.params?.id;
        const slug = req.params?.slug;
        const course = req?.body;
        await CourseLevelModel.findOne({ type: course?.level })
            .then((doc) => {
                course['level'] = doctumentToObject(doc);
            })
            .catch(next);
        let courseUpdated = await CourseModel.findOneAndUpdate(
            { slug },
            course,
            { new: true },
        );
        res.redirect(`/user/${code}/courses/page/detail/${courseUpdated.slug}`);
    },
    // [POST] /:id/courses/api/delete/:slug
    async courseDelete(req, res, next) {
        const code = req.params?.id;
        const slug = req.params?.slug;
        await CourseModel.findOneAndRemove({ slug });
        res.redirect(`/user/${code}/courses/page`);
    },
};

export default UserController;
