var mongoose = require('mongoose');

var laureadoSchema = new mongoose.Schema({
    id: String,
    firstname: String,
    surname: String,
    motivation: String,
    share: String
});

var premioSchema = new mongoose.Schema({
    year: Number,
    category: String,
    laureates: [laureadoSchema]
});

module.exports = mongoose.model('prize', premioSchema)
