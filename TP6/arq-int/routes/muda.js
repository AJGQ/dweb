var express = require('express');
var jsonfile = require('jsonfile');
var router = express.Router();

my_db = __dirname + '/../arq-son-EVO.json';

router.get('/', (req, res) => {

    if(typeof req.query.doc !== 'undefined' && req.query.doc){
        let id = parseInt(req.query.doc);
        
        if( !isNaN(id) ){
            jsonfile.readFile(my_db, (erro, arq_db) => {
                if(!erro && 0 <= id && id < arq_db.length){
                    res.render('muda', {doc: arq_db[id]});
                }else if(!error){
                    res.render('error', {error: 'o doc número ' + id + ' não existe'});
                }else{
                    res.render('error', {error: erro});
                } 
            });
        }else{
            res.render('error', {error: 'o doc número ' + id + ' não existe'});
        }
    }else{
        res.render('error', {error: 'muda precisa de param doc'});
    }

});

router.post('/', (req, res) => {
    jsonfile.readFile(my_db, (erro, arq_db)=>{
        if(!erro){
            var body = req.body;

            arq_db[body.id].prov = body.prov;
            arq_db[body.id].local = body.local;
            arq_db[body.id].tit = body.tit;
            if(arq_db[body.id].musico)
                arq_db[body.id].musico.text[0] = body.musico;
            else
                arq_db[body.id].musico = {text:[body.musico]};
            arq_db[body.id].inst = body.inst;
            if(arq_db[body.id].obs)
                arq_db[body.id].obs[0].text[0] = body.obs;
            else
                arq_db[body.id].obs = [{text:[body.obs]}];

            jsonfile.writeFile(my_db, arq_db, erro => {
                if(!erro){
                    console.log('Doc mudado com sucesso');
                    res.redirect('/lista');
                }else{
                    console.log(erro);
                }
            });
        }else{
            console.log(erro);
        }
    });
});

module.exports = router;
