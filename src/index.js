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
// Midlewares
// import SortMidleware from "./app/midlewares/sort.midleware.js";
// Routes
import route from './routes/index.route.js';
// Utils
import helperHbs from './util/handlbars.js';
import { sassRender } from './util/sass.js';
import RootApp from './util/app.js';

// Connect to DB
if (await db.connect(RootApp.NameCollection())) {
    // db.init();
    // Render SCSS
    const isSassRender = sassRender(
        path.join(RootApp.Dirname(), 'resources/scss/app.scss'),
        path.join(RootApp.Dirname(), 'public/css/app.css'),
        'compressed',
    );
    if (isSassRender) {
        const app = express();
        const host = 'localhost';
        const port = 3000;

        // Set Folder Static
        app.use(express.static(RootApp.RootFolder().public));
        // HTTP logger
        app.use(morgan('dev'));
        // Midleware
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());
        app.use(methodOverride('_method'));
        // app.use(SortMidleware);

        // Template Handlebars
        app.engine(
            'hbs',
            handlebars({
                extname: '.hbs',
                helpers: helperHbs,
            }),
        );
        app.set('view engine', 'hbs');
        app.set('views', path.join(RootApp.RootFolder().resources, 'views'));
        app.set('view options', { dirname: RootApp.Dirname() });

        // HTTP Protocol
        route(app);

        app.listen(port, () => {
            console.log(`App listening at http://${host}:${port}`);
        });
    }
}
