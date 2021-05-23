import SiteRoute from "./site.route.js";
import NewsRoute from "./news.route.js";
import UserRoute from "./user.route.js";
import CourseRoute from "./course.route.js";

const IndexRoute = (app) => {
    app.use("/courses", CourseRoute);

    app.use("/news", NewsRoute);

    app.use("/user", UserRoute);

    app.use("/", SiteRoute);
};

export default IndexRoute;
