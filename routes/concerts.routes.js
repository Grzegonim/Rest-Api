const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAll);
router.get('/concerts/random', ConcertController.getRandom);
router.post('/concerts', ConcertController.postConcert);
router.delete('/concerts/:id', ConcertController.deleteConcert);
router.put('/concerts/:id', ConcertController.putConcert);
router.get('/concerts/:id', ConcertController.getById);
router.get('/concerts/genre/:genre', ConcertController.getByGenre);
router.get('/concerts/performer/:performer', ConcertController.getByPerformer);
router.get('/concerts/day/:day', ConcertController.getByDay);
router.get('/concerts/price/:price_min/:price_max', ConcertController.getByPrice)

module.exports = router;