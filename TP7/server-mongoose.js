var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/filmes', {useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Ligação ao MongoDB feita com sucesso!')

    var filmeSchema = new mongoose.Schema({
        title: String,
        year: Number,
        cast: Array,
        genres: Array
    });

    var FilmeModel = mongoose.model('filmes', filmeSchema);

    var jcrMovie = new FilmeModel({ 
        title: 'Era uma vez qc ...',
        year: 2019, 
        cast: ["jcr", "aluno1", "aluno2"], 
        genres:["Thriller", "Comédia"]});
    console.log('Vou inserir este filme na bd: ' + jcrMovie.title);

    jcrMovie.save(function (err, filme) {
        if (err) return console.error(err);
        else
            console.log(filme.title + ' foi gravado com sucesso.')
    });

    FilmeModel.findOne({title: /Era uma/},(err, filme) =>{
        if (err) return console.error(err);
        else console.log('Recuperei o filme: ' + filme);
    });
    /*
    FilmeModel.find(function (err, filmes) {
        if (err) return console.error(err);
        else console.log(filmes);
    })
    */

});
