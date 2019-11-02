var express = require('express');
var router = express.Router();
var Filmes = require('../controllers/filmes')

/* GET home page. */
router.get('/', function(req, res, next) {
    Filmes.listar()
        .then(dados => res.render('filmes', {filmes: dados}))
        .catch(erro => res.status(500).jsonp(erro))
});

router.post('/', function(req, res, next) {
    var body = req.body;
    body.cast = body.cast.split(',');
    body.genres = body.genres.split(',');
    Filmes.insere(body);
    res.redirect('/filmes');
});

router.get('/:idFilme', function(req, res, next) {
    Filmes.consultar(req.params.idFilme)
        .then(dados => res.render('filme', {filme: dados}))
        .catch(erro => res.status(500).jsonp(erro))
})

module.exports = router;
