
module.exports = (req, res, next) => {

    res.status(404).send({error: "No Found 404"})

}