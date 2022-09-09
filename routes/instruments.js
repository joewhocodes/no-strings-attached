const express = require('express');
const router = express.Router();
const instrumentsController = require('../controllers/instruments');
const { ensureAuth } = require('../middleware/auth');

router.get('/', ensureAuth, instrumentsController.getInstruments);

router.post('/createInstrument', instrumentsController.createInstrument);

router.delete('/deleteInstrument', instrumentsController.deleteInstrument);

module.exports = router;
