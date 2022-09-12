const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const mainRoutes = require('./routes/main');
const instrumentRoutes = require('./routes/instruments');
const genreRoutes = require('./routes/genres');

//Use .env file in config folder
require('dotenv').config({ path: './config/.env' });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/', mainRoutes);
app.use('/instruments', instrumentRoutes);
app.use('/genres', genreRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
