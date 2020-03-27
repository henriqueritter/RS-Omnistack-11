import React, { useState } from 'react';

//JSX (Javascript XML)
import Header from './Header';

function App() {
  const [counter, setCounter] = useState(0);
  //Array do useState [ valorVariavel, funcaoDeAtualizacao ]

  function increment(){
    setCounter(counter + 1);
  }
  return (
    <div>
      <Header>Contador: {counter} </Header>
      <button onClick={increment}>Incrementar</button>
    </div>
  );
}


export default App;
