import path from "path";

import express from 'express';
import handlebars from "express-handlebars";
import morgan from "morgan";
import sass from "node-sass";

const app = express();

const host = 'localhost';
const port = 3000;
const __dirname = path.join(path.resolve(), 'src/');
const appFolder = {
  resources: 'resources',
  public: 'public'
};

// Set Folder Static
app.use(express.static(path.join(__dirname, appFolder.public)));
// HTTP logger
app.use(morgan('dev'));

// Template Handlebars
app.engine('hbs', handlebars({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, appFolder.resources, '/views'));

// HTTP Protocol
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/news', (req, res) => {
  res.render('news');
});

app.get('/search', (req, res) => {
  res.render('search');
});

app.listen(port, () => {
  console.log(`App listening at http://${host}:${port}`);
});