import { doctumentsToObjects, doctumentToObject } from '../../util/mongoose.js';
import { CourseModel, CourseLevelModel } from '../models/course.model.js';
import { AuthorModel } from '../models/author.model.js';

// Utils
import { sassRenderToCss } from '../../util/sass.js';
import AppRoot from '../../util/app.js';

import path from 'path';

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
            style: 'css-render',
        };
        let scssMixin = `
        @mixin showDialog(
    $selector: 'modal__dialog',
    $class: 'form-dialog',
    $type: 'info'
) {
    ##{$selector} {
        &.#{$class} {
            &.hide {
                display: none !important;
            }
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.288);
            cursor: default;

            > .#{$class}-background {
                position: absolute;
                top: 20%;
                width: 100%;
                background-color: #fff;
                border-radius: 5px;

                > .#{$class}-heading {
                    font-size: 20px;
                    margin: 10px 0;
                    padding-bottom: 10px;
                    border-bottom: 1px solid rgb(204, 193, 193);
                    @at-root {
                        .#{$class}-heading-title {
                            @if ($type == 'info') {
                                color: rgb(33, 33, 219);
                            } @else if ($type == 'warn') {
                                color: rgb(238, 141, 51);
                            } @else if ($type == 'success') {
                                color: rgb(6, 177, 57);
                            } @else if ($type == 'error') {
                                color: rgb(196, 57, 15);
                            }
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana,
                                sans-serif;
                            font-weight: 600;
                            text-transform: uppercase;
                        }
                        .#{$class}-heading-close {
                            background-color: red;
                            color: #fff;
                            text-align: center;
                            cursor: pointer;
                            &:hover {
                                opacity: 0.6;
                            }
                        }
                    }
                }

                > .#{$class}-content {
                    margin: 10px 10px;
                    @at-root {
                        .#{$class}-content-message {
                            font-size: 18px;
                            line-height: 1.6;
                        }
                    }
                }

                > .#{$class}-confirm {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-weight: 600;
                    text-transform: uppercase;
                    text-align: center;
                    margin: 5px 0;
                    padding-top: 10px;
                    border-top: 1px solid rgb(204, 193, 193);

                    @at-root {
                        .#{$class}-confirm-btn {
                            cursor: pointer;
                            padding: 5px 0;

                            &:hover {
                                color: red;
                                border-bottom: 2px solid red;
                                cursor: pointer;
                            }
                        }
                    }
                }
            }
        }
    }
}
        `;
        let cssRender = sassRenderToCss(
            scssMixin,
            `showDialog("${opsFormDialogDelete.selector}","${opsFormDialogDelete.class}","${opsFormDialogDelete.type}")`,
        );
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
