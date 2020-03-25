const express = require('express');  


//Variavel que vai armazenar a minha aplicação.
const app = express();

app.get('/', (request, response) => {
    return response.send('Hello World!');
});

//faz a aplicação escutar na porta 3333
app.listen(3333);