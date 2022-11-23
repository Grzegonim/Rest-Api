const express = require('express');
const db = require('../db.js');
const shortid = require('shortid');
const e = require('express');
const router = express.Router();

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
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
  db.testimonial = db.testimonials.map(data => {
    if(data.id.toString() === req.params.id.toString()){
      return (
        data.author = req.body.author,
        data.text = req.body.text,
        res.json({ message: 'OK' })
      );
    };
  });
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials.find(data => data.id.toString() === req.params.id.toString()));
});

module.exports = router;