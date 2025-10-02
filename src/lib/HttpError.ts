
export class HttpError extends Error{
    statusCode:number;
    data?:Record<string,any>;

    constructor(message:string,statusCode:number,data?:Record<string,any>){
        super(message);
        this.statusCode = statusCode;
        this.data = data;

        Object.setPrototypeOf(this,HttpError.prototype);
    }
    
}