const express = require('express');
const router = express.Router();
const e = require('express');
const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAll);
router.get('/concerts/random', ConcertController.getRandom);
router.post('/concerts', ConcertController.postConcert);
router.delete('/concerts/:id', ConcertController.deleteConcert);
router.put('/concerts/:id', ConcertController.putConcert);
router.get('/concerts/:id', ConcertController.getById);

module.exports = router;