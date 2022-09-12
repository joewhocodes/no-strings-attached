const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const connectDB = require('./config/database');
const flash = require("express-flash");
const logger = require('morgan');
const mainRoutes = require('./routes/main');
const instrumentRoutes = require('./routes/instruments');
const genreRoutes = require('./routes/genres');

//Use .env file in config folder
require('dotenv').config({ path: './config/.env' });

// Passport config
require('./config/passport')(passport);

//Connect To Database
connectDB();

// Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//Logging
app.use(logger('dev'));

const store = new MongoDBStore({
    uri: process.env.DB_STRING,
    collection: 'mySessions',
});

// Catch errors
store.on('error', function (error) {
    console.log(error);
});

// Setup Sessions - stored in MongoDB
app.use(
    require('express-session')({
        secret: process.env.SESSION_SECRET,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        },
        store: store,
        resave: true,
        saveUninitialized: true,
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use('/', mainRoutes);
app.use('/instruments', instrumentRoutes);
app.use('/genres', genreRoutes);

//Server Running
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
