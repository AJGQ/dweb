function apaga(id){
    console.log('Vou tentar apagar o filme: ' + id);
    axios.delete('/filmes/' + id)
        .then(response => window.location.assign('/'))
        .catch(error => console.log(error));
}
