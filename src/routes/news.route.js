import NewController from "../app/controllers/NewsController.js";
import express from "express";

const route = express.Router();

route.use('/:slug', NewController['show']);
route.use('/', NewController['index']);

export default route;

