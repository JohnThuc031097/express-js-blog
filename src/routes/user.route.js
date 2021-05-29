import express from 'express';
import UserController from '../app/controllers/user.controller.js';

const UserRoute = express.Router();

// PAGES
UserRoute.get('/:idUser/courses/page', UserController['coursePageIndex']);
UserRoute.get(
    '/:idUser/courses/page/deleted',
    UserController['coursePageDeleted'],
);
UserRoute.get(
    '/:idUser/courses/page/create',
    UserController['coursePageCreate'],
);
UserRoute.get(
    '/:idUser/courses/page/edit/:idCourse',
    UserController['coursePageEdit'],
);
UserRoute.get(
    '/:idUser/courses/page/detail/:idCourse',
    UserController['coursePageDetail'],
);

// APIS
UserRoute.post('/:idUser/courses/api', UserController['courseAdd']);
UserRoute.put('/:idUser/courses/api/:idCourse', UserController['courseUpdate']);
UserRoute.delete(
    '/:idUser/courses/api/delete/:idCourse',
    UserController['courseDelete'],
);
UserRoute.put(
    '/:idUser/courses/api/remove/:idCourse',
    UserController['courseRemove'],
);
UserRoute.put(
    '/:idUser/courses/api/restore/:idCourse',
    UserController['courseRestore'],
);

export default UserRoute;
