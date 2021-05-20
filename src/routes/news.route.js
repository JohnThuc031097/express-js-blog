import NewController from "../app/controllers/news.controller.js";
import express from "express";

const RouteNews = express.Router();

RouteNews.get("/:slug", NewController["show"]);
RouteNews.get("/", NewController["index"]);

export default RouteNews;
