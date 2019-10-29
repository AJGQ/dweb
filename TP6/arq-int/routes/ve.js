var express = require('express');
var jsonfile = require('jsonfile');
var router = express.Router();

my_db = __dirname + '/../arq-son-EVO.json';

/* GET users listing. */
router.get('/', function(req, res, next) {
    if(typeof req.query.doc !== 'undefined' && req.query.doc){
        let id = parseInt(req.query.doc);
        
        if( !isNaN(id) ){
            jsonfile.readFile(my_db, (erro, arq_db) => {
                if(!erro && 0 <= id && id < arq_db.length){
                    res.render('ve', {doc: arq_db[id]});
                }else if(!error){
                    res.render('error', {error: 'esse doc não existe'});
                }else{
                    res.render('error', {error: erro});
                } 
            });
        }else{
            res.render('error', {error: 'esse doc não existe'});
        }
    }else{
        res.render('error', {error: 've precisa de param doc'});
    }
});

//cria
//router.post('/', (req, res) => {
//  
//});


module.exports = router;
