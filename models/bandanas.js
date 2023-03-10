//BANDANA'S SCHEMA
//a schema is a blue print that our data is built on.
const mongoose = require('mongoose');

const bandanaSchema = new mongoose.Schema({
    title: {type: String, required: true},
    img: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, min: 0},
    qty: {type: Number, min: 0},
});

const Bandana = mongoose.model('Bandana', bandanaSchema);
module.exports = Bandana