var express = require('express');
var router = express.Router();

var Premios = require('../controllers/premios');

router.get('/premios', function(req, res, next) {
    var query = req.query;
    if(query.hasOwnProperty('categoria') && query.hasOwnProperty('data')){
        Premios.premios_categoria_desde(query.categoria, query.data)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
    }else if(query.hasOwnProperty('categoria')){
        Premios.premios_categoria(query.categoria)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
    }else{
        Premios.lista_premios()
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
    }
});

router.get('/premios/:id', function(req, res, next) {
    Premios.info_premio(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
});

router.get('/categorias', function(req, res, next) {
    Premios.lista_categorias()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
});

router.get('/laureados', function(req, res, next) {
    Premios.lista_laureados()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
});



module.exports = router;
