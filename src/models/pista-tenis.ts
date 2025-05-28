import { Superficie } from "./superficie";

export class PistaTenis {
    id_pista:string;
    nombre:string;
    id_superficie:Superficie;

    constructor(){
        this.id_pista="";
        this.nombre="";
        this.id_superficie = new Superficie();
    }
}
