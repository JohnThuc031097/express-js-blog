// System
import path from "path";
// Framework
import express from "express";
import handlebars from "express-handlebars";
import morgan from "morgan";
import sass from "node-sass";
// Database
import db from "./config/db/index.js";
// Route
import route from "./routes/index.route.js";


// Connect to DB
if (db.connect("blog_dev")) {
    // db.init();
}

const app = express();
const host = "localhost";
const port = 3000;

const __dirname = path.join(path.resolve(), "src");
const appFolder = {
    resources: path.join(__dirname, "resources"),
    public: path.join(__dirname, "public"),
};

// Set Folder Static
app.use(express.static(appFolder.public));
// HTTP logger
app.use(morgan("dev"));
// Midleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Template Handlebars
app.engine("hbs", handlebars({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(appFolder.resources, "views"));
app.set("view options", { dirname: __dirname });

// HTTP Protocol
route(app);

app.listen(port, () => {
    console.log(`App listening at http://${host}:${port}`);
});
