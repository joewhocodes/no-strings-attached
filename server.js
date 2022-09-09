const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/database');

require('dotenv').config({ path: './config/.env' });

connectDB();

app.use(express.json());``
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// DB SCHEMA AND MODEL
const InstrumentSchema = mongoose.Schema({
    instrument: String,
    skillLevel: String,
});

const GenreSchema = mongoose.Schema({
    genre: String,
});

const Instrument = mongoose.model('instruments', InstrumentSchema);

const Genre = mongoose.model('genres', GenreSchema);

app.get('/', (req, res) => {
    res.send('Express is here');
});

app.get('/instruments', (req, res) => {
    console.log(req);
    Instrument.find()
        .then(console.log('found items'))
        .then((items) => res.json(items))
        .catch((err) => console.log(err));
});

app.post('/instruments/create', (req, res) => {
    Instrument.create({
        instrument: req.body.instrument,
        skillLevel: req.body.skillLevel,
    })
        .then((doc) => console.log(doc))
        .catch((err) => console.log(err));
});

app.put('/instruments/update/:id', (req, res) => {
    Instrument.findByIdAndUpdate(
        { _id: req.params.id },
        {
            title: req.body.title,
            description: req.body.description,
        }
    )
        .then((doc) => console.log(doc))
        .catch((err) => console.log(err));
});

app.delete('/instruments/delete/:id', (req, res) => {
    Instrument.findByIdAndDelete({ _id: req.params.id })
        .then((doc) => console.log(doc))
        .catch((err) => console.log(err));
});

app.get('/genres', (req, res) => {
    console.log(req);
    Genre.find()
        .then(console.log('found items'))
        .then((items) => res.json(items))
        .catch((err) => console.log(err));
});

app.post('/genres/create', (req, res) => {
    Genre.create({
        Genre: req.body.genre,
        skillLevel: req.body.skillLevel,
    })
        .then((doc) => console.log(doc))
        .catch((err) => console.log(err));
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
