const Instrument = require('../models/Instruments');

module.exports = {
    getInstruments: async (req, res) => {
        console.log(req);
        try {
            await Instrument.find()
            (console.log('found items'))
            ((items) => res.json(items))
        } catch(err) {
            (err) => console.log(err)
        }
    },
    createInstrument: async (req, res) => {
        console.log(req);
        try {
            await Instrument.create({
                instrument: req.body.instrument,
                skillLevel: req.body.skillLevel,
            })
            ((doc) => console.log(doc))
        } catch(err) {
            (err) => console.log(err)
        }
    },
    // app.put('/instruments/update/:id', (req, res) => {
    //     Instrument.findByIdAndUpdate(
    //         { _id: req.params.id },
    //         {
    //             title: req.body.title,
    //             description: req.body.description,
    //         }
    //     )
    //         .then((doc) => console.log(doc))
    //         .catch((err) => console.log(err));
    // }),
    deleteInstrument: async (req, res) => {
        console.log(req);
        try {
            await Instrument.findByIdAndDelete({ _id: req.params.id })
            ((doc) => console.log(doc))
        } catch(err) {
            (err) => console.log(err)
        }
    },
}