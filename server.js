const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const instrumentRoutes = require('./routes/instruments')
const genreRoutes = require('./routes/genres')

require('dotenv').config({ path: './config/.env' });

connectDB();

app.use(express.json());``
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Express is here');
});

app.use('/instruments', instrumentRoutes)
app.use('/genres', genreRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
