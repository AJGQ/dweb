var Obra = require('../models/obras');

const Obras = module.exports;

Obras.filtra = filtro => {
    return Obra
        .find(filtro)
        .exec();
}

Obras.compositores = () => {
    return Obra
        .aggregate([{$group: {_id:"$compositor"}}])
        .exec();
}

Obras.periodos = () => {
    return Obra
        .aggregate([{$group: {_id:"$periodo"}}])
        .exec();
}

