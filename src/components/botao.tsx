import React from "react";

type BotaoProps = {
  onClick: () => void;
  texto: string;
};

export default function Botao(props: BotaoProps) {
  return (
    <button onClick={() => {props.onClick();}}>{props.texto}</button>
  );
}
