import express from 'express';
import UserController from '../app/controllers/user.controller.js';

const UserRoute = express.Router();

// PAGE
UserRoute.get('/:idUser/courses/page', UserController['coursePageIndex']);
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
// API
UserRoute.post('/:idUser/courses/api/add', UserController['courseAdd']);
UserRoute.post(
    '/:idUser/courses/api/update/:idCourse',
    UserController['courseUpdate'],
);
UserRoute.get(
    '/:idUser/courses/api/delete/:idCourse',
    UserController['courseDelete'],
);

export default UserRoute;
