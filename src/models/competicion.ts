
import { Deporte } from "./deporte";
import { EstadoCompeticiones } from "./estado-competiciones";
import { TipoCompeticion } from "./tipo-competicion";

export class Competicion {
    id:number;
    nombre_torneo:string;
    categoria:string;
    deporte_id:Deporte;
    estado_id:EstadoCompeticiones;
    tipo_competicion_id:TipoCompeticion;
    max_jugadores:number;
    id_fichero:number;

    constructor(){
        this.id=0;
        this.nombre_torneo="";
        this.categoria="";
        this.deporte_id = new Deporte();
        this.estado_id = new EstadoCompeticiones();
        this.tipo_competicion_id = new TipoCompeticion();
        this.max_jugadores = 0;
        this.id_fichero = 0;
    }
}
