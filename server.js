const express = require('express');
const mongoose = require('mongoose');
const socket = require('socket.io');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
const concertsRoutes = require('./routes/concerts.routes.js');
const testimonialsRoutes = require('./routes/testimonials.routes.js');
const seatsRoutes = require('./routes/seats.routes.js');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/', testimonialsRoutes);
app.use('/api/', seatsRoutes);
app.use('/api/', concertsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});



app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if(NODE_ENV === 'production') dbUri = 'mongodb+srv://Grzegonim:Banderas123@cluster0.a09qrd3.mongodb.net/NewWaveDB?retryWrites=true&w=majority';
else if(NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/NewWaveDBtest';
else dbUri = 'mongodb://localhost:27017/NewWaveDB';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to datebase');
});

db.on('error', err => {
  console.log('Error' + err)
});

const server = app.listen(process.env.PORT || 8001, () => {
  console.log('Server is running on port: 8001');
});

module.exports = server;
const io = socket(server);

io.on('connection', (socket) => {
  console.log('New socket!', socket.id);
});