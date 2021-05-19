import express from 'express';
import handlebars from "express-handlebars";
import morgan from "morgan";
import sass from "node-sass";

import path from "path";

import route from "./routes/index.route.js";

const app = express();

const host = 'localhost';
const port = 3000;
const __dirname = path.join(path.resolve(), 'src/');
const appFolder = {
  resources: path.join(__dirname, '/resources'),
  public: path.join(__dirname, '/public')
};

// Set Folder Static
app.use(express.static(appFolder.public));
// HTTP logger
  app.use(morgan('dev'));
// Midleware
  app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// Template Handlebars
app.engine('hbs', handlebars({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(appFolder.resources, '/views'));

// HTTP Protocol
route(app);

app.listen(port, () => {
  console.log(`App listening at http://${host}:${port}`);
});