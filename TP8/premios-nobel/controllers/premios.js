var Premio = require('../models/premios');

const Premios = module.exports;

Premios.lista_premios = () => {
    return Premio
        .find({}, {_id: 0, year: 1, category: 1})
        .exec();
}

Premios.info_premio = id_premio => {
    return Premio
        .find({_id: id_premio})
        .exec();
}

Premios.lista_categorias = () => {
    return Premio
        .aggregate([{$group: {_id: "$category"}}])
        .exec();
}

Premios.premios_categoria = categoria => {
    return Premio
        .find({category: categoria})
        .exec();
}

Premios.premios_categoria_desde = (categoria, data) => {
    return Premio
        .find({category: categoria, year: {$gt: data}})
        .exec();
}

Premios.lista_laureados = () => {
    return Premio
        .aggregate([
            {$unwind: "$laureates"}, 
            {$project: {"_id": 0, "name": {$concat: ["$laureates.firstname", " ", "$laureates.surname"]}, "year": 1, "category": 1}},
            {$sort: {"name": 1}}
        ])
        .exec();
}
