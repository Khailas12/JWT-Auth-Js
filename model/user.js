const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 6,
        max: 100
    },

    lastName: {
        type: String,
        required: true,
        min: 6,
        max: 100
    },

    email: {
        type: String,
        required: true,
        min: 6,
        max: 100,
    },

    password: {
        type: String,
        required: true,
        min: 8, 
        max: 100,
    },

    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('user', userSchema);