var express = require('express');
var axios = require('axios');
var router = express.Router();

var link = url => "http://clav-api.dglab.gov.pt/api/entidades" + url + "?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM0ODgwMDgsImV4cCI6MTU3NjA4MDAwOH0.UD0UdMrzKcWDop8HlwqdeOuK_ZzZxHvOMOP2DMkIjUQ"

var api_get = (url) => (result) => {
    axios.get(link(url))
        .then(dados => {
            result(dados);
        })
        .catch(erro => {
            res.render("error", {error: erro});
        });
}

/* GET home page. */
router.get('/', function(req, res, next) {
    api_get ("") (dados => { 
        res.render('index', { entidades: dados.data });
    });
});

router.get('/:id', function(req, res, next) {
    var info = {
        ent: 0,
        tipologias: 0,
        dono: 0,
        participante: 0,
    }
    api_get ("/"+req.params.id) (dados => { 
        info.ent = dados.data;
        api_get ("/"+req.params.id+"/tipologias") (dados => { 
            info.tipologias = dados.data;
            api_get ("/"+req.params.id+"/intervencao/dono") (dados => { 
                info.dono = dados.data;
                api_get ("/"+req.params.id+"/intervencao/participante") (dados => { 
                    info.participante = dados.data;
                    res.render('entidade', { info: info });
                });
            });
        });
    });
});

module.exports = router;
