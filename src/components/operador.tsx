import React from "react";

type OperadorProps = {
  onClick: () => void;
  texto: string;
};

export default function Operador(props: OperadorProps) {
  return (
    <button onClick={() => {props.onClick();}}>{props.texto}</button>
  );
}
