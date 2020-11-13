const mongoose = require('mongoose');

const medicamentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 1,
        max: 100
    },
    time: {
        type: [],
        required: true,
    },
    userID: {
        type: String,
        required:true,
        min: 1,
        max: 100
    }
});

module.exports = mongoose.model('Medicament', medicamentSchema);