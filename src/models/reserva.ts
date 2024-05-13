import { Horario } from "../app/horario";
import { Usuario } from "./usuario";

export class Reserva {
    id:number;
    id_pista:string;
    fecha:string;
    id_horario:Horario;
    id_usuario:Usuario;

    constructor(){
        this.id=0;
        this.id_pista="";
        this.fecha="";
        this.id_horario = new Horario();
        this.id_usuario = new Usuario();
    }
}
