
const ERROR_HANDLERS = {

    CastError: (res, message, status) => 
        res.status(status).send({msgError: message}),

    ValidationError: (res, message, status) => 
        res.status(status).send({msgError: message}),

    CustomError: (res, message, status) =>
        res.status(status).send({msgError: message}),
        
    defaultError: res => 
        res.status(500).send({msgError: "Something went wrong."})

}

module.exports = ({error, message, status}, req, res, next) => {

    console.log("handleError: ");
    
    if(error) {

        console.log(error);
        
        const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError

        handler(res, message, status);

    }else {
        console.log("Something went wrong and error is Undefined");
    }

}