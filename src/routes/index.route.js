import SiteRoute from "./site.route.js";
import NewsRoute from "./news.route.js";

const IndexRoute = (app) => {
    app.use("/news", NewsRoute);

    app.use("/", SiteRoute);
};

export default IndexRoute;
