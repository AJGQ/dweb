var Obra = require('../models/obras');

const Obras = module.exports;

Obras.filtra = filtro => {
    return Obra
        .find(filtro)
        .exec();
}

