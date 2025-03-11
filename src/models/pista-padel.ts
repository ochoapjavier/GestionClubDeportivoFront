import { Superficie } from "./superficie";

export class PistaPadel {
    id_pista:string;
    nombre:string;
    id_superficie:Superficie;
    tipoPared:string;
    cobertura:string;

    constructor(){
        this.id_pista="";
        this.nombre="";
        this.id_superficie = new Superficie();
        this.tipoPared="";
        this.cobertura="";
    }
}
