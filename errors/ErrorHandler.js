class ErrorHandler{
    constructor(status,msg){
        this.status = status
        this.message = msg
    }
    static validationError(message = 'All fields are required'){
        return new ErrorHandler(422,message)
    }

    static notFoundError(message= 'Not Found'){
        return new ErrorHandler(404, message)
    }

    static serverError(message="Internal Error"){
        return new ErrorHandler(500, message)
    }

    static forbidden(message="Not Allowed"){
        return new ErrorHandler(403, message)
    }


}
//isko routes meri use karo jaha error chahiye
module.exports = ErrorHandler