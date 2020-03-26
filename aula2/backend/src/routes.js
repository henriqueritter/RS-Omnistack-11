const express = require('express');

//colocando o modulo de rotas do Express dentro de uma variavel
const routes = express.Router();


routes.post('/users', (request, response) => {  //route params
    const params = request.body;        //request body, busca um JSON ou outro no metodo POST
    console.log(params);

    //return response.send('Hello World!'); //tambem podemos retornar a resposta em formato JSON
    return response.json({ 
        evento: 'Semana OmniStack 11.0',
        aluno: 'Henrique Ritter '
    });
});

module.exports = routes;  //exporta variavel de um arquivo

