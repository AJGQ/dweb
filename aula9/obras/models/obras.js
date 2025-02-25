var mongoose = require('mongoose');

var obraSchema = new mongoose.Schema({
    _id: String,
    nome: String,
    desc: String,
    anoCriacao: String,
    periodo: String,
    compositor: String,
    duracao: String
});

var obrasSchema = new mongoose.Schema(
    [obraSchema]
);

module.exports = mongoose.model('obra', obrasSchema)
