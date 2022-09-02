import React, { useEffect, useState } from "react";
import Botao from "./components/botao";
import Numero from "./components/numero";
import "./index.css";

function App() {
  const [contador, setContador] = useState(0);

  function diminuir() {
    setContador(contador - 1);
  }

  function aumentar() {
    setContador(contador + 1);
  }

  useEffect(()=>{
    if(contador) {
      if(contador % 2 === 0) alert("é par");
    }
  }, [contador])

  return (
    <div>
      <Numero>
        <p style={{ color: "red" }}>{contador}</p>
      </Numero>
      <Botao onClick={diminuir} texto="Diminuir" />
      <Botao onClick={aumentar} texto="Aumentar" />
    </div>
  );
}

export default App;
