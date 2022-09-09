const express = require('express');
const router = express.Router();
const genresController = require('../controllers/genres');

router.get('/', genresController.getGenres);

router.post('/createGenre', genresController.createGenre);

router.delete('/deleteGenre', genresController.deleteGenre);

module.exports = router;
