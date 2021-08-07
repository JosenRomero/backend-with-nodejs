
exports.login = async (req, res) => {

    if(req.user) {

        res.status(200).json({
            message: "user has successfully authenticated",
            user: req.user
        });

    }

}

exports.logout = async (req, res) => {

    req.logout();
    res.redirect(process.env.CLIENT_URL);

}