const Concert = require('../models/concerts.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const con = await Concert.findOne().skip(rand);
    if(!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const con = await Concert.findById(req.params.id);
    if(!con) res.status(404).json({ message: 'OK' });
    res.json(con);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getByGenre = async (req, res) => {
  try {
    const con = await Concert.find({ genre: req.params.genre });
    if(!con) res.status(404).json({ message: 'Not found' });
    res.json(con);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getByPerformer = async (req, res) => {
  try {
    const performer = req.params.performer.replace("+", " ");
    const con = await Concert.find({ performer: performer });
    if(!con) res.status(404).json({ message: 'Not found' });
    res.json(con);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getByDay = async (req, res) => {
  try {
    const con = await Concert.find({ day: req.params.day });
    if(!con) res.status(404).json({ message: 'Not found' });
    res.json(con);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getByPrice = async (req, res) => {
  try {
    const con = await Concert.find({ price: { $gt: req.params.price_min, $lt: req.params.price_max } });
    if(!con) res.status(404).json({ message: 'Not found' });
    res.json(con);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.postConcert = async (req, res) => {
  try {
    const { performer, genre, price, day } = req.body;
    const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day });
    await newConcert.save();
    res.json({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json({ message: 'OK' });
  }
};

exports.putConcert = async (req, res) => {
  const { performer, genre, price, day } = req.body;
  try {
    const con = await Concert.findById(req.params.id);
    if(con) {
      await Concert.updateOne({ _id: req.params.id }, {$set: { performer: performer, genre: genre, price: price, day: day }});
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteConcert = async (req, res) => {
  try {
    const con = await Concert.findById(req.params.id);
    if(con){
      await Concert.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};