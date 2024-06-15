const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    flight_id: Number,
    airline: String,
    origin: String,
    destination: String,
    departure_time: Date,
    arrival_time: Date,
    status: String
});

module.exports = mongoose.model('Flight', flightSchema);
