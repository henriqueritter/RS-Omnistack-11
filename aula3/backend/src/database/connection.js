/**
 * Arquivo de conexao com o BD
 */
const knex = require('knex');  //importa o KNEX
const configuration = require('../../knexfile'); //recupera as configs do arquivo  knexfile que esta na pasta backend

const connection = knex(configuration.development); //recupera as configuracoes de development 

module.exports = connection; //Exporta nossa conexão com o BD para ser importada por outro arquivo (routes.js no caso).