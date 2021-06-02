import SiteRoute from './site.route.js';
import NewsRoute from './news.route.js';
import UserRoute from './user.route.js';
import CourseRoute from './course.route.js';
// Midlewares
import SortMidleware from '../app/midlewares/sort.midleware.js';

const IndexRoute = (app) => {
    app.use('/', SiteRoute);

    app.use('/courses', CourseRoute);

    app.use('/news', NewsRoute);

    app.use('/user', SortMidleware, UserRoute);
};

export default IndexRoute;
