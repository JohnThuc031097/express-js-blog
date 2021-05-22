import express from "express";
import CourseController from "../app/controllers/course.controller.js";

const CourseRoute = express.Router();

CourseRoute.post("/store/add", CourseController["storeAdd"]);
CourseRoute.get("/create", CourseController["create"]);
CourseRoute.get("/:keyword", CourseController["show"]);

export default CourseRoute;
