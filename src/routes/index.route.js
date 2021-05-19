import siteRoute from "./site.route.js";
import newsRoute from "./news.route.js";

const route = (app) => {

  app.use('/news', newsRoute);

  app.use('/', siteRoute);
}

export default route;