const express = require('express');
const e = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonials.controller');

router.get('/testimonials', TestimonialController.getAll);
router.get('/testimonials/random', TestimonialController.getRandom);
router.post('/testimonials', TestimonialController.postTestimonial);
router.delete('/testimonials/:id', TestimonialController.deleteTestimonial);
router.put('/testimonials/:id', TestimonialController.putTestimonial);
router.get('/testimonials/:id', TestimonialController.getById);

module.exports = router;