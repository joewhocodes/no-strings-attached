const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
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

const app = express();
// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

// Connect to MongoDB
mongoose
    .connect(process.env.DB_STRING, { useNewUrlParser: true })
    .then(() => console.log('MongoDB successfully connected'))
    .catch((err) => console.log(err));

//Logging
app.use(logger('dev'));

// Passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use('/', mainRoutes);
app.use('/instruments', instrumentRoutes);
app.use('/genres', genreRoutes);
app.use('/api/users', users);

//Server Running
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
