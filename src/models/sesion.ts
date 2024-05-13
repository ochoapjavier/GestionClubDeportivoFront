import { Horario } from "src/app/horario";
import { Grupo } from "./grupo";
import { Reserva } from "./reserva";

export class Sesion {
    id: number;
    id_grupo: Grupo;
    fecha: string;
    titulo: string;
    descripcion: string;
    id_reserva: Reserva;

    constructor(){
        this.id = 0;
        this.id_grupo = new Grupo;
        this.fecha = "";
        this.titulo = "";
        this.descripcion = "";
        this.id_reserva = new Reserva();
    }
}
