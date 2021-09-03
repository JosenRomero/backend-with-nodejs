
exports.login = async (req, res, next) => {

    if(req.user) {

        res.status(200).json({
            message: "user has successfully authenticated",
            user: req.user
        });

    }else {
        next({error: {name: 'CustomError'}, message: "Unauthorized", status: 401});
    }

}

exports.logout = async (req, res) => {

    req.logout();
    res.redirect(process.env.CLIENT_URL);

}