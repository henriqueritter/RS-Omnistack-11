const express = require('express');  


//Variavel que vai armazenar a minha aplicação.
const app = express();

/**
 * Rota / Recurso
 */

 /**
  * Metodos HTTP:
  * GET: Buscar uma informação do back-end
  * Ao criar uma rota que o backend vai retornar alguma infromacao (usuario, dado) usamos o metodo GET
  * 
  * POST: sempre que quisermos criar uma informação no back-end
  * A rota recebe os dados do usuario por exemplo/ senha e eamil e envia pro backend
  * 
  * PUT: Alterar uma informação no back-end
  * 
  * DELETE: informacao no back-end
  * 
  * 
  */
app.post('/users', (request, response) => {
    //return response.send('Hello World!'); //tambem podemos retornar a resposta em formato JSON
    return response.json({ 
        evento: 'Semana OmniStack 11.0',
        aluno: 'Henrique Ritter'
    });
});

//faz a aplicação escutar na porta 3333
app.listen(3333);