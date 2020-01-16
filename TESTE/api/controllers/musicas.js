var Musica = require('../models/musicas');
var mongoose = require('mongoose');

const Musicas = module.exports;

Musicas.obrasLimitadas = () => {
    return Musica
        .find(
            {}, 
            {
                _id: 0,
                id: 1,
                titulo: 1,
                tipo: 1,
                compositor: 1
        })
        .exec()
}

Musicas.obrasFiltraCompositor = (comp) => {
    return Musica
        .find(
            {compositor : comp})
        .exec()
}

Musicas.obrasFiltraInstrumento = (instr) => {
    return Musica
        .find(
            {instrumento: instr})
        .exec()
}

Musicas.obraToda = (id) => {
    return Musica
        .find(
            {id: id})
        .exec()
}

Musicas.tiposTodos = () => {
    return Musica
        .find({}, {_id: 0, tipo: 1})
        .exec()
}
/*
 *"instrumentos" : {
                 "instrumento" : {
                                             "designacao" : "Sax Barítono",
                                             "partitura" : {

 * */
Musicas.obraListaLimitada= () => {
    return Musica
        .find({}, {
                _id: 0,
                id: 1,
                titulo: 1,
                tipo: 1,
                instrumentos: 1
        })
        .exec()
}

