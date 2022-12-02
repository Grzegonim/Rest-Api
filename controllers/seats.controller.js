const Seat = require('../models/seats.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Seat.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const sat = await Seat.findOne().skip(rand);
    if(!sat) res.status(404).json({ message: 'Not found' });
    else res.json(sat);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const sat = await Seat.findById(req.params.id);
    if(!sat) res.status(404).json({ message: 'Not found' });
    else res.json(sat);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postSeat = async (req, res) => {
  try {
    const { email, seat, client, day } = req.body;
    const newSeat = new Seat({ email: email, seat: seat, day: day, client: client });
    await newSeat.save();
    res.json({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putSeat = async (req, res) => {
  const { day, seat, client, email } = req.body;
  try {
    const con = await Seat.findById(req.params.id);
    if(con) {
      await Seat.updateOne({ _id: req.params.id }, {$set: { day: day, seat: seat, client: client, email: email }});
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteSeat = async (req, res) => {
  try {
    const sat = await Seat.findById(req.params.id);
    if(sat) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};
