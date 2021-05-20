import express from "express";
import SiteController from "../app/controllers/site.controller.js";

const SiteRoute = express.Router();

SiteRoute.get("/search", SiteController["search"]);
SiteRoute.get("/", SiteController["index"]);

export default SiteRoute;
