//Costumes Schema
const mongoose = require('mongoose');

const costumeSchema = new mongoose.Schema({
    title: {type: String, required: true},
    img: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, min: 0},
    qty: {type: Number, min: 0},
});

const Costume = mongoose.model('Costume', costumeSchema);
module.exports = Costume