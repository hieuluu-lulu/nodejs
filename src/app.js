const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const app = express();
const port = 3000;
const route = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override'); // cho phép ghi đè phương thức post and get mặc định của form bằng PUT, PATCH OR DELETE

// Connect to DB
db.connect();
//method override
app.use(methodOverride('_method'));
// static file
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

//template engines handlebar
app.engine(
    'hbs',
    exphbs({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => {
                return a + b;
            },
        },
    }),
);
app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

// HTTP logger
app.use(morgan('combined'));

//127.0.0.1 - localhost
app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);
