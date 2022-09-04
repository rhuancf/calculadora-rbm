import React from "react";


type BotaoProps = {
  onClick: () => void;
  texto: string;
  className?: string;
};

export default function Botao(props: BotaoProps) {
  return (
    <button className={props.className} onClick={() => {props.onClick();}}>{props.texto}</button>
  );
}
