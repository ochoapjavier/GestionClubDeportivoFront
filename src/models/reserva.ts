import { Horario } from "../app/horario";

export class Reserva {
    id:number;
    id_pista:string;
    fecha:string;
    horario:Horario;

    constructor(){
        this.id=0;
        this.id_pista="";
        this.fecha="";
        this.horario = new Horario();
    }
}
