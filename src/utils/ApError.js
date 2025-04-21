class ApiError extends  Error {
    constructor(
        statuscode,
        message = "something went wrong",
        errors = [],
        sstack ="",
    ){
       super(message);
       this.statuscode = statuscode;
       this.data = null;
       this.message = message;
       this.succeess = false;
       this.errors = errors;


        if (stack) {
           this.stack = stack; 
        }else {
            Error.captureStackTrace(this,this.constructor)
            
        }
    }
}

export { ApiError }