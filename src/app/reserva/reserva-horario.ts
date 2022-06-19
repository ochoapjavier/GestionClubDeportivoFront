export class ReservaHorario {
    id:number;
    id_horario: number;
    id_pista:string;
    fecha:string;
    hora_inicio:string;
    hora_fin:string;

    constructor(){
        this.id=0;
        this.id_horario=0;
        this.id_pista="";
        this.fecha="";
        this.hora_inicio="";
        this.hora_fin="";
    }
}
