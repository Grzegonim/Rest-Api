const mongoose = require('mongoose');

const ConcertsSchema = new mongoose.Schema({
  performer: { type: String, reuired: true },
  genre: { type: String, reuired: true },
  price: { type: Number, reuired: true },
  day: { type: Number, reuired: true }
});

module.exports = mongoose.model('Concerts', ConcertsSchema);
