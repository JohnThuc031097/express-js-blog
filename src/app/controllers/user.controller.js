// Import Models
import { CourseModel, CourseLevelModel } from '../models/course.model.js';
import { AuthorModel } from '../models/author.model.js';

// Import Utils
import { doctumentsToObjects, doctumentToObject } from '../../util/mongoose.js';
import { sassRenderToCss } from '../../util/sass.js';

const UserController = {
    /**
     * PAGE
     */
    // [GET] /:idUser/course/page
    async coursePageIndex(req, res, next) {
        const idUser = req.params?.idUser;
        let courses = [];
        let coursesDeletedCount = 0;
        let querySort = {};
        if (res.locals._sort.enable) {
            querySort[`${res.locals._sort.column}`] = res.locals._sort.type;
        }
        await CourseModel.find({ author: idUser })
            .populate('author')
            .populate('level')
            .sort(querySort)
            .then((docs) => {
                courses = doctumentsToObjects(docs);
            })
            .catch(next);
        await CourseModel.countDocumentsDeleted({ author: idUser })
            .then((countDeleted) => {
                coursesDeletedCount = countDeleted;
            })
            .catch(next);
        let optionsDialog = {
            selector: 'modal__dialog',
            class: 'form-dialog',
            style: 'css-render',
        };
        let scssMixin = `
            @mixin showDialog($selector: "modal__dialog", $class: "form-dialog") {
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
            > {
                .#{$class}-background {
                    position: absolute;
                    top: 20%;
                    width: 100%;
                    background-color: #fff;
                    border-radius: 5px;
                    > {
                        .#{$class}-heading {
                            font-size: 20px;
                            margin: 10px 0;
                            padding-bottom: 10px;
                            border-bottom: 1px solid rgb(204, 193, 193);
                            > {
                                .#{$class}-heading-title {
                                    color: rgb(33, 33, 219);
                                    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
                                    font-weight: 600;
                                    text-transform: uppercase;
                                }
                                .#{$class}-heading-close {
                                    background-color: red;
                                    color: #fff;
                                    text-align: center;
                                    border-radius: 3px;
                                    cursor: pointer;
                                    &:hover {
                                        opacity: 0.6;
                                    }
                                }
                            }
                        }

                        .#{$class}-content {
                            margin: 10px 10px;
                            > {
                                .#{$class}-content-message {
                                    font-size: 18px;
                                    line-height: 1.6;
                                }
                            }
                        }

                        .#{$class}-footer {
                            display: flex;
                            justify-content: center;
                            margin: 5px 0;
                            padding-top: 10px;
                            border-top: 1px solid rgb(204, 193, 193);
                            > {
                                .#{$class}-footer-btn {
                                    flex-grow: 1;
                                    background-color: transparent;
                                    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
                                    font-weight: 600;
                                    text-transform: uppercase;
                                    text-align: center;
                                    border: none;
                                    padding: 5px 0;
                                    border-bottom: 2px solid transparent;
                                    cursor: pointer;

                                    &:hover {
                                        color: red;
                                        border-bottom-color: red;
                                        cursor: pointer;
                                    }
                                }
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
            `showDialog("${optionsDialog.selector}","${optionsDialog.class}")`,
        );
        res.render('users/courses/index', {
            idUser,
            courses,
            coursesDeletedCount,
            cssRender,
            optionsDialog,
        });
    },
    // [GET] /:idUser/courses/page/bin
    async coursePageDeleted(req, res, next) {
        const idUser = req.params?.idUser;
        let courses = [];
        let coursesCount = 0;
        let querySort = {};
        if (res.locals._sort.enable) {
            querySort[`${res.locals._sort.column}`] = res.locals._sort.type;
        }
        await CourseModel.findDeleted({ author: idUser })
            .populate('author')
            .populate('level')
            .sort(querySort)
            .then((docs) => {
                courses = doctumentsToObjects(docs);
            })
            .catch(next);
        await CourseModel.countDocuments({ author: idUser })
            .then((count) => {
                coursesCount = count;
            })
            .catch(next);
        let optionsDialog = {
            selector: 'modal__dialog',
            class: 'form-dialog',
            style: 'css-render',
        };
        let scssMixin = `
            @mixin showDialog($selector: "modal__dialog", $class: "form-dialog") {
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
            > {
                .#{$class}-background {
                    position: absolute;
                    top: 20%;
                    width: 100%;
                    background-color: #fff;
                    border-radius: 5px;
                    > {
                        .#{$class}-heading {
                            font-size: 20px;
                            margin: 10px 0;
                            padding-bottom: 10px;
                            border-bottom: 1px solid rgb(204, 193, 193);
                            > {
                                .#{$class}-heading-title {
                                    color: rgb(33, 33, 219);
                                    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
                                    font-weight: 600;
                                    text-transform: uppercase;
                                }
                                .#{$class}-heading-close {
                                    background-color: red;
                                    color: #fff;
                                    text-align: center;
                                    border-radius: 3px;
                                    cursor: pointer;
                                    &:hover {
                                        opacity: 0.6;
                                    }
                                }
                            }
                        }

                        .#{$class}-content {
                            margin: 10px 10px;
                            > {
                                .#{$class}-content-message {
                                    font-size: 18px;
                                    line-height: 1.6;
                                }
                            }
                        }

                        .#{$class}-footer {
                            display: flex;
                            justify-content: center;
                            margin: 5px 0;
                            padding-top: 10px;
                            border-top: 1px solid rgb(204, 193, 193);
                            > {
                                .#{$class}-footer-btn {
                                    flex-grow: 1;
                                    background-color: transparent;
                                    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
                                    font-weight: 600;
                                    text-transform: uppercase;
                                    text-align: center;
                                    border: none;
                                    padding: 5px 0;
                                    border-bottom: 2px solid transparent;
                                    cursor: pointer;

                                    &:hover {
                                        color: red;
                                        border-bottom-color: red;
                                        cursor: pointer;
                                    }
                                }
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
            `showDialog("${optionsDialog.selector}","${optionsDialog.class}")`,
        );
        res.render('users/courses/deleted', {
            idUser,
            courses,
            coursesCount,
            cssRender,
            optionsDialog,
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
     * API
     */
    // [POST] /:idUser/courses/api
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
            .then(() => {
                res.redirect(`/user/${idUser}/courses/page/`);
            })
            .catch(next);
    },
    // [PUT] /:idUser/courses/api/:idCourse
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
    // Force delete
    // /:idUser/courses/api/delete/:idCourses
    async courseDelete(req, res, next) {
        const idCourses = (req.params?.idCourses).split(',');
        if (idCourses.length > 0) {
            idCourses.forEach(async (idCourse) => {
                await CourseModel.findByIdAndDelete(idCourse).catch(next);
            });
        } else {
            await CourseModel.findByIdAndDelete(idCourses).catch(next);
        }
        res.redirect('back');
    },
    // [PUT]
    // Soft delete (Remove)
    // /:idUser/courses/api/remove/:idCourses
    async courseRemove(req, res, next) {
        const idCourses = (req.params?.idCourses).split(',');
        if (idCourses.length > 0) {
            idCourses.forEach(async (idCourse) => {
                await CourseModel.deleteById(idCourse).catch(next);
            });
        } else {
            await CourseModel.deleteById(idCourses).catch(next);
        }
        res.redirect('back');
    },
    // [PUT]
    // Restore when after removed
    // /:idUser/courses/api/restore/:idCourses
    async courseRestore(req, res, next) {
        const idCourses = (req.params?.idCourses).split(',');
        if (idCourses.length > 0) {
            idCourses.forEach(async (idCourse) => {
                await CourseModel.restore({ _id: idCourse }).catch(next);
            });
        } else {
            await CourseModel.restore({ _id: idCourse }).catch(next);
        }
        res.redirect('back');
    },
};

export default UserController;
