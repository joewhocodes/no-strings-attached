const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const instrumentRoutes = require('./routes/instruments')

require('dotenv').config({ path: './config/.env' });

connectDB();

app.use(express.json());``
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// DB SCHEMA AND MODEL
// const InstrumentSchema = mongoose.Schema({
//     instrument: String,
//     skillLevel: String,
// });

const GenreSchema = mongoose.Schema({
    genre: String,
});

// const Instrument = mongoose.model('instruments', InstrumentSchema);

const Genre = mongoose.model('genres', GenreSchema);

app.get('/', (req, res) => {
    res.send('Express is here');
});

app.use('/instruments', instrumentRoutes)

app.get('/genres', (req, res) => {
    console.log(req);
    Genre.find()
        .then(console.log('found items'))
        .then((items) => res.json(items))
        .catch((err) => console.log(err));
});

app.post('/genres/create', (req, res) => {
    Genre.create({
        genre: req.body.genre,
    })
        .then((doc) => console.log(doc))
        .catch((err) => console.log(err));
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
