const express = require('express');  


//Variavel que vai armazenar a minha aplicação.
const app = express();

app.get('/', (request, response) => {
    //return response.send('Hello World!'); //tambem podemos retornar a resposta em formato JSON
    return response.json({ 
        evento: 'Semana OmniStack 11.0',
        aluno: 'Henrique Ritter'
    });
});

//faz a aplicação escutar na porta 3333
app.listen(3333);