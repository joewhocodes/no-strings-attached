const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const logger = require("morgan");
const mainRoutes = require('./routes/main');
const instrumentRoutes = require('./routes/instruments');
const genreRoutes = require('./routes/genres');

//Use .env file in config folder
require('dotenv').config({ path: './config/.env' });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

// Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//Logging
app.use(logger("dev"));

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
