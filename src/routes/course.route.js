import express from "express";
import CourseController from "../app/controllers/course.controller.js";

const CourseRoute = express.Router();

CourseRoute.get("/", CourseController["index"]);
CourseRoute.get("/:slug", CourseController["show"]);

export default CourseRoute;
