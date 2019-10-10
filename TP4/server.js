let http = require('http');
let fs = require('fs');

let not_found = (res) => {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.write('Ficheiro não existente');
    res.end();
}

let servidor = http.createServer((req, res) => {
    let partes = req.url.split('/');
    let pag = partes[partes.length-1];

    try{
        pag = parseInt(pag);
        if(1 <= pag && pag <= 122){
            fs.readFile('arq_sit/arq' + pag + '.xml', (err, data) => {
                res.writeHead(200, {'Content-Type' : 'text/html'});
                res.write(data);
                res.end();
            });
        }else{
            not_found (res);
        }
    }catch(err){
        not_found (res);
    }
});

servidor.listen(7777);
