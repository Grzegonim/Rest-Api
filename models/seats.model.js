const mongoose = require('mongoose');

const SeatsSchema = new mongoose.Schema({
  email: { type: String, reuired: true },
  seat: { type: Number, reuired: true },
  client: { type: String, reuired: true },
  day: { type: Number, reuired: true }
});

module.exports = mongoose.model('Seats', SeatsSchema);