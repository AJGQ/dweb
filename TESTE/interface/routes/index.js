var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', function(req, res, next) {
    axios.get('http://clav-api.dglab.gov.pt/api/entidades/?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg4NjAwNTQsImV4cCI6MTU4MTQ1MjA1NH0.HIlH4_Ao6504qaLhhbZ2_OtDzaZaG5FeYy-Yc2d9lwQ')
        .then(dados => {
            res.render('index', { entidades: dados.data});
        })
        .catch(erro => {
            res.render('error', {error: erro});
        })
});

router.get('/entidade/:id', function(req, res, next) {
    axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg4NjAwNTQsImV4cCI6MTU4MTQ1MjA1NH0.HIlH4_Ao6504qaLhhbZ2_OtDzaZaG5FeYy-Yc2d9lwQ')
        .then(ent => {
            axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '/tipologias?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg4NjAwNTQsImV4cCI6MTU4MTQ1MjA1NH0.HIlH4_Ao6504qaLhhbZ2_OtDzaZaG5FeYy-Yc2d9lwQ')
                .then(tipologias => {
                    axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '/intervencao/dono?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg4NjAwNTQsImV4cCI6MTU4MTQ1MjA1NH0.HIlH4_Ao6504qaLhhbZ2_OtDzaZaG5FeYy-Yc2d9lwQ')
                        .then(dono => {
                            axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '/intervencao/participante?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg4NjAwNTQsImV4cCI6MTU4MTQ1MjA1NH0.HIlH4_Ao6504qaLhhbZ2_OtDzaZaG5FeYy-Yc2d9lwQ')
                                .then(participante => {
                                    res.render('entidade', { entidade: ent.data, tipologias: tipologias.data, dono: dono.data, participante: participante.data});
                                })
                                .catch(erro => {
                                    res.render('error', {error: erro});
                                })
                        })
                        .catch(erro => {
                            res.render('error', {error: erro});
                        })
                })
                .catch(erro => {
                    res.render('error', {error: erro});
                })
        })
        .catch(erro => {
            res.render('error', {error: erro});
        })
});

//GET recupera a info de um aluno
router.get('/:idAluno', function(req, res, next) {
    axios.get('http://localhost:3000/api/alunos/' + req.params.idAluno)
        .then(dados => {
            res.render('pag-aluno', { aluno: dados.data });
        })
        .catch(erro => {
            res.render('error', {error: erro});
        })
});

router.get('/editar/:idAluno', function(req, res, next) {
    axios.get('http://localhost:3000/api/alunos/' + req.params.idAluno)
        .then(dados => {
            res.render('edita-aluno', { aluno: dados.data });
        })
        .catch(erro => {
            res.render('error', {error: erro});
        })
});

//POST 
router.post('/', function(req, res, next) {
    axios.post('http://localhost:3000/api/alunos', req.body)
        .then(dados => {
            res.redirect('/');
        })
        .catch(erro => {
            res.render('error', {error: erro});
        })
});

router.post('/editar', (req, res) => {
    axios.put('http://localhost:3000/api/alunos', req.body)
        .then(dados => {
            res.redirect('/');
        })
        .catch(erro => {
            res.render('error', {error: erro});
        })
})

//PUT
router.put('/alunos/', (req, res) => {
    Alunos.alterar(req.body)
        .then(dados => {
            res.redirect('/');
        })
        .catch(erro => {
            res.render('error', {error: erro});
        })
})

module.exports = router;
