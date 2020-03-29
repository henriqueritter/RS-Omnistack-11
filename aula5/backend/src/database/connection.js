/**
 * Arquivo de conexao com o BD
 */
const knex = require('knex');  //importa o KNEX
const configuration = require('../../knexfile'); //recupera as configs do arquivo  knexfile que esta na pasta backend

//se a variavel de ambiente for a test, utilize a configuracao do BD test se não, utilize a development
const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;


const connection = knex(config); //recupera as configuracoes de development 

module.exports = connection; //Exporta nossa conexão com o BD para ser importada por outro arquivo (routes.js no caso).