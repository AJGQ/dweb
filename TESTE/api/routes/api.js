var express = require('express');
var router = express.Router();

var Musicas = require('../controllers/musicas');

router.get('/obras', function(req, res, next) {
    if(req.query.compositor){
        Musicas.obrasFiltraCompositor(req.query.compositor)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
    }else if(req.query.instrumento){
        Musicas.obrasFiltraInstrumento(req.query.instrumento)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
    }else{
        Musicas.obrasLimitadas()
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
    }
});

router.get('/obras/:id', function(req, res, next) {
    Musicas.obraToda(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
});

router.get('/tipos', function(req, res, next) {
    Musicas.tiposTodos() //sem repeticoes
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
});

router.get('/obrasQuant', function(req, res, next) {
    Musicas.obraListaLimitada() 
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
});


module.exports = router;
