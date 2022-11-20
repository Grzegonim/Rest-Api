const express = require('express');
const db = require('../db.js');
const shortid = require('shortid');
const router = express.Router();

router.route('/testimonials').get((req, res) => {
  res.send(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  res.send(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

router.route('/testimonials').post((req, res) => {
  db.testimonials.push({ author: req.body.author, text: req.body.text, id: shortid() });
  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').delete((req, res) => {
  const index = db.testimonials.findIndex(data => data.id.toString() === req.params.id.toString());
  db.testimonials.splice(index, 1);
  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res) => {
  db.testimonials.map(data => (data.id.toString() === req.params.id.toString()) && (data.author = req.body.author, data.text = req.body.text));
  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').get((req, res) => {
  res.send(db.testimonials.filter(data => data.id.toString() === req.params.id.toString()));
});

module.exports = router;