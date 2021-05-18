import path from "path";

import express from 'express';
import morgan from "morgan";
import handlebars from "express-handlebars";

const app = express();

const host = 'localhost';
const port = 3000;
const appFolder = {
  resources: 'resources',
  public: 'public'
};
const __dirname = path.join(path.resolve(), 'src/');

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

app.listen(port, () => {
  console.log(`App listening at http://${host}:${port}`);
});