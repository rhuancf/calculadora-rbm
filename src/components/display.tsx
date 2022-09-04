import React from "react";

type DisplayProps = {
  operandoAnterior:string;
  operandoAtual:string;
};

export default function Operador(props: DisplayProps) {
  return (
    <div className="display">
        <div className="operando-anterior">{props.operandoAnterior}</div>
        <div className="operando-atual">{props.operandoAtual}</div>
    </div>
  );
}




