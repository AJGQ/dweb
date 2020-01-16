var mongoose = require('mongoose');

var partituraSchema = new mongoose.Schema({
    voz : String,
    type: String,
    path: String,
    clave: String,
});

var instrSchema = new mongoose.Schema({
    designacao : String,
    partitura : partituraSchema
});

var instrumentoSchema = new mongoose.Schema({
    instrumento : [instrSchema]
});


var linkSchema = new mongoose.Schema({
    href: String,
});

var infoSchema = new mongoose.Schema({
    video: linkSchema,
});

var obraSchema = new mongoose.Schema({
    id: String,
    titulo: String,
    tipo: String,
    arranjo: String,
    compositor: String,
    inf_relacionada: infoSchema,
    instrumentos: instrumentoSchema,
});

var obrasSchema = new mongoose.Schema([obraSchema]);


module.exports = mongoose.model('arquivo', obrasSchema)
