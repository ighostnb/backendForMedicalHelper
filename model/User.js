const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        min: 1,
        max: 100
    },
    surname: {
        type: String,
        required: false,
        min: 1,
        max: 100,
    },
    lastName: {
        type: String,
        required: false,
        min: 1,
        max: 100
    },
    age: {
        type: String,
        required: false,
        min: 1,
        max: 3
    },
    bloodGroup: {
        type: String,
        required: false,
        min: 2,
        max: 2
    },
    phoneNumber: {
        type: String,
        required: false,
        min: 2,
        max: 50
    },
    adress1: {
        type: String,
        required: false,
        min: 1,
        max: 255
    },
    adress2: {
        type: String,
        required: false,
        min: 1,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 8
    },
    heartbeatNow: {
        type: String,
        required: false,
    },
    o2Now: {
        type: String,
        required: false,
    }, 
    role: {
        type: String,
        required:true,
    }
});

module.exports = mongoose.model('User', userSchema);