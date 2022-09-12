const Genre = require('../models/Genre');

module.exports = {
    getGenres: async (req, res) => {
        try {
            const genres = await Genre.find();
            console.log('found items');
            res.json(genres);
        } catch (err) {
            err => console.log(err);
        }
    },
    createGenre: async (req, res) => {
        try {
            console.log(req)
            await Genre.create({
                genre: req.body.genre,
            });
        } catch (err) {
            err => console.log(err);
        }
    },
    // app.put('/Genres/update/:id', (req, res) => {
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
    deleteGenre: async (req, res) => {
        console.log(req);
        try {
            await Genre.findByIdAndDelete({ _id: req.params.id })((doc) =>
                console.log(doc)
            );
        } catch (err) {
            err => console.log(err);
        }
    },
};
