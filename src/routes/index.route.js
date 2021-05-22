import SiteRoute from "./site.route.js";
import NewsRoute from "./news.route.js";
import CourseRoute from "./course.route.js";

const IndexRoute = (app) => {
    app.use("/courses", CourseRoute);

    app.use("/news", NewsRoute);

    app.use("/", SiteRoute);
};

export default IndexRoute;
