const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate'); //Importacao do celebrate para validação

const OngController = require('./controllers/OngController');  //Importa os controllers da Ong(insert, etc..)
const IncidentController = require('./controllers/IncidentController');  //Importa os controllers da Ong(insert, etc..)
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');  //Modulo de Login

//colocando o modulo de rotas do Express dentro de uma variavel
const routes = express.Router();

routes.post('/sessions', SessionController.create);

/** Rota de Consultar ONGS */
/** @todo validacao ID enviado */
routes.get('/ongs', OngController.index);
/** Rota de cadastro de ONG */
/** 
 * podemos passar na vlidação os Query parms, Route parms, Body parms, headers
*/
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({  //O SEGMENTS.BODY é passado por dentro de [] pois ele é uma variavel e sempre no  JS que for passada uma variavel dentro de um objeto se faz necessario declarar entre []
        name: Joi.string().required(), 
        email: Joi.string().required().email(), 
        whatsapp: Joi.string().required().min(10).max(11),  //Whatsapp coloquei como string pois como number não funcionou 
        city: Joi.string().required(), 
        uf: Joi.string().required().length(2),
    })            
}), OngController.create);

/** Rota do Profile que retorna os incidents de uma ONG especifica */
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({            //Aqui como a validação é por headers utilizamos o .unknow após o objeto poiis não conhecemos todos os HEADERS que serão enviados
        authorization: Joi.string().required(),      //poderiamos utilizar  .uuid() para verificar ou entao o .regex()  para ver se o id é valido
    }).unknown(), 
}), ProfileController.index);

/** Rotas dos Incidentes(casos) */
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index);

/**
 * @todo criar validacao no campo incidients, com headers params e body params
 */
routes.post('/incidents', IncidentController.create); 


routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete);

module.exports = routes;  //exporta a variavel routes variavel de um arquivo no NODE, pode ser importado em outro usando o require

