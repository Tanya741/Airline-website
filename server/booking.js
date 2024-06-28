const mongoose = require('mongoose');
const review = require('./review');

const Schema = mongoose.Schema;




// Define the Booking Schema

const bookingSchema = new Schema({

    flight_date:Date,

    user:String,

    bookedAt: {

        type: Date,

        default: Date.now // Automatically set the current date and time

    },
    airLine:String,
    
});






const Booking = mongoose.model('Booking', bookingSchema);




module.exports = Booking;
