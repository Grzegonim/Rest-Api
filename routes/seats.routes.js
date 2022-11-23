const express = require('express');
const db = require('../db.js');
const shortid = require('shortid');

const router = express.Router();

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/random').get((req, res) => {
  res.json(db.seats[Math.floor(Math.random() * db.seats.length)]);
});

router.route('/seats').post((req, res) => {
  const orderSeat = () => {
    db.seats.push({ email: req.body.email, seat: req.body.seat, client: req.body.client, day: req.body.day, id: shortid() });
    res.json({ message: 'OK' });
  };
  const takenSeat = () => {
    res.status(500).json({ message: "The slot is already taken..." });
  };
  db.seats.some((orederedSeat) => orederedSeat.day.toString() === req.body.day.toString() && orederedSeat.seat.toString() === req.body.seat.toString()) ? takenSeat() : orderSeat();
});

router.route('/seats/:id').delete((req, res) => {
  const index = db.seats.findIndex(data => data.id.toString() === req.params.id.toString());
  db.seats.splice(index, 1);
  res.json({ message: 'OK' });
});

router.route('/seats/:id').put((req, res) => {
  db.seat = db.seats.map(data => {
    if(data.id.toString() === req.params.id.toString()){
      return (
        data.day = req.body.day, 
        data.seat = req.body.seat, 
        data.client = req.body.client, 
        data.email = req.body.email,
        res.json({ message: 'OK' })
      )
    };
  });
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.find(data => data.id.toString() === req.params.id.toString()));
});

module.exports = router;