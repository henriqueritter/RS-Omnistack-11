import React from 'react';

export default function Header({ children }){      //Componente
    return(             //o parametro props(de propriedades) é passado para ser recuperado a propriedade titulo passada no App.js
                        //no caso de dentro do App.js esteja assim:     <Header title="Semana OmniStack 11" /> 
        <header>
                <h2>{ children } </h2>
                
        </header>       //elemento do HTML
    );
}

//export default Header; usamos este export OU declamos igual esta acima antes da function Header