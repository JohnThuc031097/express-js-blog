import express from "express";
import SiteController from "../app/controllers/site.controller.js";

const SiteRoute = express.Router();

SiteRoute.get("/", SiteController["index"]);
SiteRoute.get("/search", SiteController["search"]);

export default SiteRoute;
