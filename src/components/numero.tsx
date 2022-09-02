import React, { ReactNode } from "react";
import { isPropertySignature } from "typescript";

type NumeroProps = {
    children: ReactNode
}

export default function Numero(props: NumeroProps) {
    return(<p>{props.children}</p>)
}
