
import { Competicion } from "./competicion";
import { Usuario } from "./usuario";

export class RelCompeticionUsuario {
    id:number;
    id_competicion:Competicion;
    id_usuario:Usuario;


    constructor(){
        this.id=0;
        this.id_competicion = new Competicion();
        this.id_usuario = new Usuario();
    
    }
}
