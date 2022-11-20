const express = require('express');
const shortid = require('shortid');
const db = require('./db.js');
const app = express();

// Routes
const concertsRoutes = require('./routes/concerts.routes.js');
const testimonialsRoutes = require('./routes/testimonials.routes.js');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(testimonialsRoutes);

app.use(concertsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});