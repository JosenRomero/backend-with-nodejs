
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
    console.error(error.name);

    const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError

    handler(res, message, status);

}