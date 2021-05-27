import express from 'express';
import UserController from '../app/controllers/user.controller.js';

const UserRoute = express.Router();

// PAGES
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

// APIS
UserRoute.post('/:idUser/courses/api', UserController['courseAdd']);
UserRoute.put('/:idUser/courses/api/:idCourse', UserController['courseUpdate']);
UserRoute.delete(
    '/:idUser/courses/api/:idCourse',
    UserController['courseDelete'],
);

export default UserRoute;
