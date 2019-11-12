var express = require('express');
var router = express.Router();

var Obras = require('../controllers/obras');

router.get('/', function(req, res, next) {
    var query = req.query;
    if(query.hasOwnProperty('compositor') && query.hasOwnProperty('duracao')){
        var filtro = {
            compositor: query.compositor,
            duracao: {$gte: query.duracao}
        };
        Obras.filtra(filtro)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
    }else if(query.hasOwnProperty('ano')){
        var filtro = {
            anoCriacao: query.ano
        };
        console.dir(filtro);
        Obras.filtra(filtro)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
    }else if(query.hasOwnProperty('periodo')){
        var filtro = {
            periodo: query.periodo
        };
        Obras.filtra(filtro)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
    }else{
        Obras.filtra({})
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
    }
});

router.get('/:id', function(req, res, next) {

    Obras.filtra({_id: req.params.id})
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
});


module.exports = router;
