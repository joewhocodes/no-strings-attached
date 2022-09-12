const Instrument = require("../models/Instrument");

module.exports = {
    getIndex: (req, res) => {
        res.send('Express is here');
    },
    getProfile: async (req, res) => {
        try {
            const instruments = await Instrument.find({ user: req.user.id });
            res.json(instruments);
        } catch (err) {
            console.log(err);
        }
    },
};
