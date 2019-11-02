var Filme = require('../models/filme');
var mongoose = require('mongoose');

const Filmes = module.exports;

//Devolve a lista
Filmes.listar = () => {
    return Filme
        .find()
        .sort({title: 1})
        .exec()
}

Filmes.insere = filme => {
    mongoose.connect('mongodb://localhost/filmes', {useNewUrlParser: true, useUnifiedTopology: true });
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('Ligação ao MongoDB feita com sucesso!');

        var FilmeModel = mongoose.model('filmes', Filme.FilmeSchema);
        var newFilme = new FilmeModel(filme);
        console.log('Vou inserir este filme na bd: ' + newFilme.title);

        newFilme.save((err, filme) => {
            if (!err) 
                console.log(filme.title + ' foi gravado com sucesso.');
            else 
                console.error(err);
        });
    });
}

Filmes.consultar = fid => {
    return Filme
        .findOne({_id: fid})
        .exec()
}

Filmes.contar = () => {
    return Filme
        .countDocuments()
        .exec()
}

Filmes.projetar = campos => {
    return Filme
        .find({}, campos)
        .exec()
}

Filmes.agregar = campos => {
    return Filme
        .aggregate([{$group: {_id: "$" + campo, contador: {$sum: 1}}},
                    {$sort: {contador: -1}}])
        .exec()
}
