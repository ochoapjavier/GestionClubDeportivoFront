
export class UploadFileResponse {
    fileName:string;
    fileDownloadUri:string;
    fileType:string;
    size:number;
    fileID:number;

    constructor(){
        this.fileName="";
        this.fileDownloadUri="";
        this.fileType = "";
        this.size = 0;
        this.fileID = 0;

    }
}
