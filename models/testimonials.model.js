const mongoose = require('mongoose');

const TestimonialsSchema = new mongoose.Schema({
  author: { type: String, reuired: true },
  text: { type: String, reuired: true }
});

module.exports = mongoose.model('Testimonials', TestimonialsSchema);