import NewController from "../app/controllers/news.controller.js";
import express from "express";

const RouteNews = express.Router();

RouteNews.get("/", NewController["index"]);
RouteNews.get("/:slug", NewController["show"]);

export default RouteNews;
