
exports.login = (req, res, next) => {

    if(req.isAuthenticated()) {

        res.status(200).json({
            message: "user has successfully authenticated",
            user: req.user
        });

    }else {
        next({error: {name: 'CustomError'}, message: "Unauthorized", status: 401});
    }

}

exports.logout = async (req, res, next) => {

    res.clearCookie('connect.sid', { sameSite: 'none', secure: true });

    req.logout(function(err) {

        if(err) return next(err)
        
        req.session.destroy(function (err) {
            res.json({ message: "logout" });
        })

    });

}