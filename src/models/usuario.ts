export class Usuario {
    id:number;
    email:string;
    password:string;
    nombre:string;
    apellido1:string;
    apellido2:string;
    rol:string;
    terminos:number;
    privacidad:number;
    comercial:number;


    constructor(){
        this.id=0;
        this.email="";
        this.password="";
        this.nombre="";
        this.apellido1="";
        this.apellido2="";
        this.rol="";
        this.terminos=0;
        this.privacidad=0;
        this.comercial=0;
    }
}
