import express from "express";
import UserController from "../app/controllers/user.controller.js";

const UserRoute = express.Router();

// PAGE
UserRoute.get("/:id/courses/page", UserController["coursePageIndex"]);
UserRoute.get("/:id/courses/page/create", UserController["coursePageCreate"]);
UserRoute.get("/:id/courses/page/edit/:slug", UserController["coursePageEdit"]);
UserRoute.get(
    "/:id/courses/page/detail/:slug",
    UserController["coursePageDetail"],
);
// API
UserRoute.post("/:id/courses/api/add", UserController["courseAdd"]);
UserRoute.post("/:id/courses/api/update/:slug", UserController["courseUpdate"]);
UserRoute.get("/:id/courses/api/delete/:slug", UserController["courseDelete"]);

export default UserRoute;
