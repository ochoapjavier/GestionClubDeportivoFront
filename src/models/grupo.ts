
import { Horario } from "src/app/horario";
import { Deporte } from "./deporte";
import { DiasGrupo } from "./dias-grupo";
import { Usuario } from "./usuario";

export class Grupo {
    id:number;
    nombre:string;
    id_monitor:Usuario;
    id_deporte:Deporte;
    capacidad:number;
    id_dias_grupo:DiasGrupo;
    id_horario:Horario;

    constructor(){
        this.id=0;
        this.nombre="";
        this.id_monitor = new Usuario();
        this.id_deporte = new Deporte();
        this.capacidad = 0;
        this.id_dias_grupo = new DiasGrupo();
        this.id_horario = new Horario();
    }
}
