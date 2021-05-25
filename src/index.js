// System
import path from 'path';
// Framework
import express from 'express';
import handlebars from 'express-handlebars';
import morgan from 'morgan';
// Database
import db from './config/db/index.js';
// Route
import route from './routes/index.route.js';
// Util
import { sum, compare, formatDate } from './util/handlbars.js';
import { sassRender } from './util/sass.js';

// Variables
const __dirname = path.join(path.resolve(), 'src');
const appFolder = {
    resources: path.join(__dirname, 'resources'),
    public: path.join(__dirname, 'public'),
};

// Connect to DB
if (await db.connect('education_dev')) {
    //db.init();
    // Render SCSS
    const isSassRender = sassRender(
        path.join(__dirname, 'resources/scss/app.scss'),
        path.join(__dirname, 'public/css/app.css'),
        'compressed',
    );
    if (isSassRender) {
        const app = express();
        const host = 'localhost';
        const port = 3000;

        // Set Folder Static
        app.use(express.static(appFolder.public));
        // HTTP logger
        app.use(morgan('dev'));
        // Midleware
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());

        // Template Handlebars
        app.engine(
            'hbs',
            handlebars({
                extname: '.hbs',
                helpers: {
                    sum,
                    compare,
                    formatDate,
                },
            }),
        );
        app.set('view engine', 'hbs');
        app.set('views', path.join(appFolder.resources, 'views'));
        app.set('view options', { dirname: __dirname });

        // HTTP Protocol
        route(app);

        app.listen(port, () => {
            console.log(`App listening at http://${host}:${port}`);
        });
    }
}
