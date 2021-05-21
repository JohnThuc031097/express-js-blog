import express from "express";
import CourseController from "../app/controllers/course.controller.js";

const CourseRoute = express.Router();

CourseRoute.get("/:slug", CourseController["show"]);
CourseRoute.get("/", CourseController["index"]);

export default CourseRoute;
