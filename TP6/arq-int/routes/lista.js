var express = require('express');
var jsonfile = require('jsonfile');
var router = express.Router();

my_db = __dirname + '/../arq-son-EVO.json';

/* GET users listing. */
router.get('/', function(req, res, next) {
    jsonfile.readFile(my_db, (erro, arq_db) => {
        if(!erro){
            res.render('lista', {arq: arq_db});
        }else{
            res.render('error', {error: erro});
       } 
    });
});

router.post('/', (req, res) => {
    jsonfile.readFile(my_db, (erro, arq_db)=>{
        if(!erro){
            var body = req.body;
            body.id = arq_db.length;
            arq_db.push(body);
            jsonfile.writeFile(my_db, arq_db, erro => {
                if(!erro){
                    console.log('Doc criado com sucesso');
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

router.delete('/*', (req, res) => {
    jsonfile.readFile(my_db, (erro, arq_db) => {
        if(!erro){
            var id = parseInt(req.url.split('/')[1]);
            if(!isNaN(id) && 0<=id && id < arq_db.length){
                for(var i=id; i<arq_db.length-1; i++){
                    arq_db[i+1].id--;
                    arq_db[i] = arq_db[i+1];
                }
                arq_db.pop();
                jsonfile.writeFile(my_db, arq_db, erro => {
                    if(!erro){
                        console.log('Removido com sucesso');
                        res.redirect(303, '/lista');
                    }else{
                        console.log(erro);
                    }
                });
            }else{
                console.log('O doc número ' + id + ' não existe');
            }
            
        }else{
            console.log(erro);
        }
    });
});

module.exports = router;
