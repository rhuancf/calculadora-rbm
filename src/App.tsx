import React, { useEffect, useState, useReducer } from "react";
import Botao from "./components/botao";
import Operador from "./components/operador";
import Display from "./components/display";
import  blackhole  from "./images/blackhole.gif";
import  explosion  from "./images/explosion.gif";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
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
      setOperandoAtual(eval(operandoAtual + ultimoCalculo).toString());
    } else {
      const calculo = eval(operandoAnterior.replace("÷", "/") + operandoAtual);
      setOperandoAtual(eval(calculo).toString());
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
      console.log(operandoAtual)
      if (operandoAtual == 'NaN') {
        Swal.fire({
          title: 'Olha ai o que vc fez!',
          showConfirmButton: false,
          color: '#black',
          background: `transparent`,
          backdrop: `
            black
            url(${blackhole})
            center
            no-repeat
          `
        })
        
        setOperandoAtual("0");
        setOperandoAnterior("");
      }
      if (operandoAtual == "Infinity") {
        Swal.fire({
          imageUrl: `${explosion}`,
          imageWidth: 600,
          imageHeight: 700,
          imageAlt: 'Custom image',
          position: 'top',
          showConfirmButton: false,
          backdrop: 'black',
          background: `transparent url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/dc214649-d3ae-4d8c-88bf-03d4e8a4c80c/de10a2n-e3c380e5-e331-42bb-a080-1aedc2eab018.gif?token)`,
          
        })
        setOperandoAtual("0");
        setOperandoAnterior("");
      }
    }
  }, [operandoAtual]);
  
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
