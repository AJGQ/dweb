function apaga(id){
    console.log('Vou tentar apagar o doc número' + id);
    axios.delete('/lista/' + id)
        .then(response => window.location.assign('/lista'))
        .catch(error => console.log(error))
}
