import { doctumentsToObjects } from "../../util/mongoose.js";
import { CourseModel } from "../models/course.model.js";

const SiteController = {
    // [GET] /
    index(req, res, next) {
        CourseModel.find({})
            .then((courses) => {
                console.log(doctumentsToObjects(courses));
                res.render("home", { courses: doctumentsToObjects(courses) })
            })
            .catch(next);
    },
    // [GET] /search
    search(req, res) {
        res.render("search");
    },
};

export default SiteController;
