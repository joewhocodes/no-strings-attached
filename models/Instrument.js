const mongoose = require('mongoose');

const InstrumentSchema = mongoose.Schema({
    instrument: String,
    skillLevel: String,
});

module.exports = mongoose.model('instruments', InstrumentSchema);