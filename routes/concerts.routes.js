const express = require('express');
const db = require('../db.js');
const shortid = require('shortid');

const router = express.Router();

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/random').get((req, res) => {
  res.json(db.concerts[Math.floor(Math.random() * db.concerts.length)]);
});

router.route('/concerts').post((req, res) => {
  db.concerts.push({ performer: req.body.performer, genre: req.body.genre, price: req.body.price, day: req.body.day, id: shortid() });
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res) => {
  const index = db.concerts.findIndex(data => data.id.toString() === req.params.id.toString());
  db.concerts.splice(index, 1);
  res.json({ message: 'OK' });
});+

router.route('/concerts/:id').put((req, res) => {
  db.concert = db.concerts.map(data => {
    if(data.id.toString() === req.params.id.toString()){
      return (
        data.performer = req.body.performer, 
        data.genre = req.body.genre, 
        data.price = req.body.price, 
        data.day = req.body.day,
        res.json({ message: 'OK' })
      )
    };
  });
});

router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts.find(data => data.id.toString() === req.params.id.toString()));
});

module.exports = router;