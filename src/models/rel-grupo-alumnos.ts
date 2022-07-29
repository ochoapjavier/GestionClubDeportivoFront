import { Grupo } from "./grupo";
import { Usuario } from "./usuario";

export class RelGrupoAlumnos {
    id:number;
    id_grupo:Grupo;
    id_alumno:Usuario;


    constructor(){
        this.id=0;
        this.id_grupo = new Grupo();
        this.id_alumno = new Usuario();
    
    }
}
