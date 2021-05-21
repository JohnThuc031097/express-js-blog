import SiteRoute from "./site.route.js";
import NewsRoute from "./news.route.js";
import CoursesRoute from "./courses.route.js";

const IndexRoute = (app) => {
    app.use("/courses", CoursesRoute);

    app.use("/news", NewsRoute);

    app.use("/", SiteRoute);
};

export default IndexRoute;
