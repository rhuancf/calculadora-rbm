import React, { useEffect, useState, useReducer } from "react";
import Botao from "./components/botao";
import Operador from "./components/operador";
import Display from "./components/display";
import "./index.css";

function App() {
  const [operandoAtual, setOperandoAtual] = useState("0");
  const [operandoAnterior, setOperandoAnterior] = useState("");
  const [ultimoCalculo, setUltimoCalculo] = useState("");

  function digito(texto: string) {
    if (texto === "." && operandoAtual.toString().includes(".")) return false;
    if (texto === "." && operandoAtual == '0') texto = '0.';
    
    //Limpando zeros à esquerda
    if(operandoAtual.toString().includes(".")){
      setOperandoAtual(operandoAtual + texto); //Não limpa o zero à esquerda quando seguido de um ponto
    } else {
      setOperandoAtual(operandoAtual.toString().replace(/^0+/,'') + texto); // Limpa zeros à esquerda
    }
  }

  function operacao(texto: string) {
    if(operandoAtual){
      setOperandoAnterior(operandoAtual + " " + texto);
      setOperandoAtual("");
    }
  }

  function del() {
    setOperandoAtual("0");
  }

  function limpar() {
    setOperandoAtual("0");
    setOperandoAnterior("");
  }

  function calcular() {
    if (operandoAnterior == "" && ultimoCalculo != "") {
      setOperandoAtual(eval(operandoAtual + ultimoCalculo));
    } else {
      const calculo = eval(operandoAnterior.replace("÷", "/") + operandoAtual);
      setOperandoAtual(eval(calculo));
      setOperandoAnterior("");
      setUltimoCalculo(
        operandoAnterior.replace("÷", "/").replaceAll(/[0-9.]/g, "") +
          " " +
          operandoAtual
      );
    }
  }

  useEffect(() => {
    if (operandoAtual) {
      if (operandoAtual == "Infinity") {
        alert("Calma lá, amigão!");
        setOperandoAtual("");
        setOperandoAnterior("");
      }
    }
  }, [operandoAtual]);

  // function renderizaPrimeiraLinha() {
  //   return (
  //     <div>
  //       <Botao className="span-two" texto="AC" onClick={() => limpar()} />
  //       <Botao texto="DEL" onClick={() => del()} />
  //       <Operador texto="÷" onClick={() => operacao("÷")} />
  //     </div> 
  //   );
    
  // }

  return (
    <div className="grid-calculadora">
      <Display operandoAtual={operandoAtual} operandoAnterior={operandoAnterior} />
      <Botao className="span-two" texto="AC" onClick={() => limpar()} />
      <Botao texto="DEL" onClick={() => del()} />
      <Operador texto="÷" onClick={() => operacao("÷")} />
      <Botao texto="7" onClick={() => digito("7")} />
      <Botao texto="8" onClick={() => digito("8")} />
      <Botao texto="9" onClick={() => digito("9")} />
      <Operador texto="*" onClick={() => operacao("*")} />
      <Botao texto="4" onClick={() => digito("4")} />
      <Botao texto="5" onClick={() => digito("5")} />
      <Botao texto="6" onClick={() => digito("6")} />
      <Operador texto="+" onClick={() => operacao("+")} />
      <Botao texto="1" onClick={() => digito("1")} />
      <Botao texto="2" onClick={() => digito("2")} />
      <Botao texto="3" onClick={() => digito("3")} />
      <Operador texto="-" onClick={() => operacao("-")} />
      <Botao texto="." onClick={() => digito(".")} />
      <Botao texto="0" onClick={() => digito("0")} />
      <Botao className="span-two" texto="=" onClick={() => calcular()} />
    </div>
  );
}

export default App;
