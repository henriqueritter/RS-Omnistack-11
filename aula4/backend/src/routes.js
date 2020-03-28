const express = require('express');

const OngController = require('./controllers/OngController');  //Importa os controllers da Ong(insert, etc..)
const IncidentController = require('./controllers/IncidentController');  //Importa os controllers da Ong(insert, etc..)
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');  //Modulo de Login

//colocando o modulo de rotas do Express dentro de uma variavel
const routes = express.Router();

routes.post('/sessions', SessionController.create);

/** Rota de Consultar ONGS */
routes.get('/ongs', OngController.index);
/** Rota de cadastro de ONG */
routes.post('/ongs', OngController.create);

/** Rota do Profile que retorna os incidents de uma ONG especifica */
routes.get('/profile', ProfileController.index);
/** Rotas dos Incidentes(casos) */
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;  //exporta a variavel routes variavel de um arquivo no NODE, pode ser importado em outro usando o require

