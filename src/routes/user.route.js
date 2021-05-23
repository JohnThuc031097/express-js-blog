import express from "express";
import UserController from "../app/controllers/user.controller.js";

const UserRoute = express.Router();

UserRoute.get("/:id/courses/add", UserController["courseAdd"]);
UserRoute.get("/:id/courses", UserController["courses"]);

export default UserRoute;
