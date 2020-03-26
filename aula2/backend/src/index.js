const express = require('express');  


const routes = require('./routes');  //é necessario colocar ./  para o NODE entender que se trata de um arquivo e não um pacote, se quiser voltar uma pasta coloque ../


const app = express();

app.use(express.json()); //antes de todas as requisições o express vai converter os textos em JSON para ser entendido pelo App 
app.use(routes);

app.listen(3333);