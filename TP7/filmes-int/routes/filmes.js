var express = require('express');
var router = express.Router();
var Filmes = require('../controllers/filmes')

router.get('/', (req, res) => {
    Filmes.listar()
        .then(dados => res.render('filmes', {filmes: dados}))
        .catch(erro => res.status(500).jsonp(erro))
});

router.post('/', (req, res) => {
    var body = req.body;
    if(body.cast == '')
        body.cast = [];
    else
        body.cast = body.cast.split(',');
    if(body.genres == '')
        body.genres = [];
    else
        body.genres = body.genres.split(',');
    Filmes.inserir(body);
    res.redirect('/');
});

router.get('/:idFilme', (req, res) => {
    Filmes.consultar(req.params.idFilme)
        .then(dados => res.render('filme', {filme: dados}))
        .catch(erro => res.status(500).jsonp(erro))
})

router.delete('/:idFilme', (req, res) => {
    Filmes.apagar(req.params.idFilme);
    res.redirect(303, '/');
});

module.exports = router;
