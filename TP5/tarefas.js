var http = require('http');
var url = require('url');
var pug = require('pug');
var fs = require('fs');
var jsonfile = require('jsonfile');

var {parse} = require('querystring');

var my_db = "tarefas.json";

var my_server = http.createServer((req,res) => {
    var p_url = url.parse(req.url, true);
    var query = p_url.query;

    console.log(req.method + ' ' + p_url.pathname);

    switch(req.method){
        case "GET":
            if(p_url.pathname == "/"){
                res.writeHead(200, {
                    'Content-Type' : 'text/html; charset=utf-8'
                });
                jsonfile.readFile(my_db, (erro, tarefas) => {
                    if(!erro){
                        res.write(pug.renderFile('index.pug', {tarefas: tarefas}));
                    } else {
                        res.write(pug.renderFile('erro.pug', {e: "Erro na leitura da bd..."}));
                    }
                    res.end();
                });
            } else if(p_url.pathname == "/w3.css") {
                res.writeHead(200, {
                    'Content-Type' : 'text/css'
                });
                fs.readFile('stylesheets/w3.css', (erro, dados)=>{
                    if(!erro){
                        res.write(dados);
                    } else {
                        res.write("<p> Erro: " + erro + "</p>");
                    }
                    res.end();
                }); // assincronous!!!!!!!!
            } else {
                res.writeHead(200, {
                    'Content-Type' : 'text/html; charset=utf-8'
                });
                res.write(pug.renderFile('erro.pug', {e: "Erro a página deve estar na /"}));
                res.end();
            }
            break;

        case "POST":
            res.writeHead(200, {
                'Content-Type' : 'text/html; charset=utf-8'
            });
            if(p_url.pathname == '/'){
                recuperaInfo(req, resultado => {
                    jsonfile.readFile(my_db, (erro, tarefas) => {
                        if(!erro){
                            tarefas.push(resultado);
                            jsonfile.writeFile(my_db, tarefas, (erro) => {
                                if(!erro){
                                    console.log('registo gravado com sucesso...');
                                    res.write(pug.renderFile('index.pug', {tarefas: tarefas}));
                                    res.end();
                                } else {
                                    console.log(erro);
                                    res.write(pug.renderFile('erro.pug', {e: "Erro a escrever na db..."}));
                                    res.end();
                                }
                            })
                        }else{
                            res.write(pug.renderFile('erro.pug', {e: "Erro a ler a db..."}));
                            res.end();
                        }
                    });
                });
            } else {
                res.write(pug.renderFile('erro.pug', {e: "Erro na leitura da bd..."}));
                res.end();
            }
            break;

        default:
            res.writeHead(200, {
                'Content-Type' : 'text/html; charset=utf-8'
            });
            console.log( "ERRO: " + req.method + " não suportado...");
            res.write(pug.renderFile('erro.pug', {e: "ERRO: " + req.method + " não suportado..."}));
            res.end();
    }
});


function recuperaInfo(request, callback){
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded'){
        var body = '';
        request.on('data', bloco => {
            body += bloco.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
}


my_server.listen(7777, () => {
    console.log("Servidor à escuta na porta 7777...");
});
