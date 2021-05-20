import { DoctumentsToObjects } from "../../util/mongoose.js";
import CourseModel from "../models/course.model.js";

const SiteController = {
    // [GET] /
    index(req, res, next) {
        CourseModel.find({})
            .then((courses) =>
                res.render("home", { courses: DoctumentsToObjects(courses) }),
            )
            .catch(next);
    },
    // [GET] /search
    search(req, res) {
        res.render("search");
    },
};

export default SiteController;
