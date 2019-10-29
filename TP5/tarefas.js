var http = require('http');
var url = require('url');
var pug = require('pug');
var fs = require('fs');
var jsonfile = require('jsonfile');

var {parse} = require('querystring');

var my_db = "tarefas.json";

function header_html(res){
    res.writeHead(200, {
        'Content-Type' : 'text/html; charset=utf-8'
    });
}

function header_css(res){
    res.writeHead(200, {
        'Content-Type' : 'text/css'
    });
}

function error_page_style(res, s){
    header_html(res);
    res.write(pug.renderFile('erro.pug', {e: s}));
    res.end();
}

function page_html(res, page){
    header_html(res);
    res.write(page);
    res.end();
}

function page_css(res, page){
    header_css(res);
    res.write(page);
    res.end();
}

var my_server = http.createServer((req,res) => {
    var p_url = url.parse(req.url, true);
    var query = p_url.query;

    console.log(req.method + ' ' + p_url.pathname);

    switch(req.method){
        case "GET":
            if(p_url.pathname == "/"){
                jsonfile.readFile(my_db, (erro, tarefas) => {
                    if(!erro){
                        page_html(res, pug.renderFile('index.pug', {tarefas: tarefas}));
                    } else {
                        error_page_style(res,"Erro na leitura da bd...");
                    }
                });
            } else if(p_url.pathname == "/w3.css") {
                fs.readFile('stylesheets/w3.css', (erro, dados)=>{
                    if(!erro){
                        page_css(res, dados);
                    } else {
                        page_css(res, "<p> Erro: " + erro + "</p>");
                    }
                });
            } else {
                error_page_style(res, "Erro a página deve estar na /")
            }
            break;

        case "POST":
            if(p_url.pathname == '/'){
                recuperaInfo(req, resultado => {
                    jsonfile.readFile(my_db, (erro, tarefas) => {
                        if(!erro){
                            tarefas.push(resultado);
                            jsonfile.writeFile(my_db, tarefas, (erro) => {
                                if(!erro){
                                    console.log('registo gravado com sucesso...');
                                    page_html(res, pug.renderFile('index.pug', {tarefas: tarefas}));
                                } else {
                                    console.log(erro);
                                    error_page_style(res, "Erro a escrever na db...")
                                }
                            })
                        }else{
                            error_page_style(res, "Erro a ler a db...");
                        }
                    });
                });
            } else {
                error_page_style(res, "Erro volte para /");
            }
            break;

        default:
            error_page_style(res,"ERRO: " + req.method + " não suportado...");
    }
});


function recuperaInfo(request, callback){
    console.log(request.body);
    console.log(request);
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
