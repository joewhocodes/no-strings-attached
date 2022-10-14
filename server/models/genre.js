const mongoose = require('mongoose');

const GenreSchema = mongoose.Schema({
    genre: String,
});

module.exports = mongoose.model('genres', GenreSchema);