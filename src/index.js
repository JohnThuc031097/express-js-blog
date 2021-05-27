/**
 * Import libs
 */
// System
import path from 'path';
// Framework SAVE
import express from 'express';
import handlebars from 'express-handlebars';
// Frameworks DEVE
import morgan from 'morgan';
import methodOverride from 'method-override';
// Configs
import db from './config/db/index.js';
// Routes
import route from './routes/index.route.js';
// Utils
import { sum, isEven, compare, formatDate } from './util/handlbars.js';
import { sassRender } from './util/sass.js';

/**
 * Declaration variabkes
 */
// Variables
const __dirname = path.join(path.resolve(), 'src');
const appFolder = {
    resources: path.join(__dirname, 'resources'),
    public: path.join(__dirname, 'public'),
};
const nameCollection = 'education_dev';

/**
 * Code here
 */
// Connect to DB
if (await db.connect(nameCollection)) {
    // db.init();
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
        app.use(methodOverride('_method'));

        // Template Handlebars
        app.engine(
            'hbs',
            handlebars({
                extname: '.hbs',
                helpers: {
                    sum,
                    isEven,
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
