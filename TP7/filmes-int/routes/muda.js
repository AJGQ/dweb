var express = require('express');
var router = express.Router();
var Filmes = require('../controllers/filmes')

router.get('/:idFilme', (req, res) => {
    Filmes.consultar(req.params.idFilme)
        .then(dados => res.render('muda', {filme: dados}))
        .catch(erro => res.status(500).jsonp(erro))
});

router.post('/:idFilme', (req, res) => {
    var body = req.body;
    if(body.cast == '')
        body.cast = [];
    else
        body.cast = body.cast.split(',');
    if(body.genres == '')
        body.genres = [];
    else
        body.genres = body.genres.split(',');

    Filmes.mudar(req.params.idFilme, body);
    res.redirect(303, '/filmes/'+req.params.idFilme);
});

module.exports = router;
