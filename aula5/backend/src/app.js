const express = require('express');  
const cors = require('cors'); //utilizado para o front end acessar o backend
const { errors } = require('celebrate');    //Importado para tratar os erros (para nao vir dos 500)

const routes = require('./routes');  //é necessario colocar ./  para o NODE entender que se trata de um arquivo e não um pacote, se quiser voltar uma pasta coloque ../


const app = express();

app.use(cors(
    //se o app estivesse em producao poderiamos colocar o parametro abaixo
    //origin: 'http://meusiteHospedadoQuePodeAcessar.meuapp.com
    //porem como estamos no develop, só de declarar ele aqui sem parametro ja conseguiremos acessar este backend por qualquer 
    //front end aqui
));
app.use(express.json()); //antes de todas as requisições o express vai converter os textos em JSON para ser entendido pelo App 
app.use(routes);
app.use(errors());  //tratametno de erros do celebrate

module.exports = app; 