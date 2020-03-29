import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';  //ele esta importando o arquivo App.js da pasta SRC(mesma pasta)

ReactDOM.render(    //colocando em tela
  <React.StrictMode>
    <App />           
  </React.StrictMode>,  //por App ser um componente podemos escrever ele como uma tag HTML como uma DIV ou outro
  document.getElementById('root')   //colcando onde a ID for root
);

