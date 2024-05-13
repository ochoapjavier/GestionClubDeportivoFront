export class Fichero {
    id:number;
    filename:string;
    type:string;
    data:Blob;

    constructor(){
        this.id=0;
        this.filename="";
        this.type="";
        this.data = new Blob();
    }
}
