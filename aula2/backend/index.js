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

  /**
   * Tipos de parametros:
   * 
   * Query Params: paramentros Noemados que enviamos na rota após o simbolo de ? (servem para filtros, paginação)
   *    Ex: app.get('/users?name=Henrique', (request, response) => {
   *    Onde passamos um parametro para busca de algo pelo metodo GET
   *    acessmos ele pelo request.query;
   * Route Params: Usados para identificar recursos
   *    Ex: app.get('/users/:id')  isso significa que tudo que está apos de /users/  corresponde a ID do usuário.
   *    Ex insomnia: metodo GET- http://localhost:3333/users/1   (retorna usuario da ID 1)
   * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos.
   */
app.use(express.json()); //antes de todas as requisições o express vai converter os textos em JSON para ser entendido pelo App 
//app.get('/users', (request, response) => {  //query params
//app.get('/users/:id', (request, response) => {  //route params

app.post('/users', (request, response) => {  //route params
 
    
    //const params = request.query;     //query Params
    //const params = request.params;    //Route params
    const params = request.body;        //request body, busca um JSON ou outro no metodo POST
    console.log(params);

    //return response.send('Hello World!'); //tambem podemos retornar a resposta em formato JSON
    return response.json({ 
        evento: 'Semana OmniStack 11.0',
        aluno: 'Henrique Ritter'
    });
});

//faz a aplicação escutar na porta 3333
app.listen(3333);