const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth.controller');
const passport = require('passport');

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/facebook', passport.authenticate('facebook'));

router.get(
    '/facebook/callback', 
    passport.authenticate('facebook', 
    { 
        successRedirect: `${process.env.CLIENT_URL}/tasks`,
        failureRedirect: process.env.CLIENT_URL,
        session: true
    })
);

// The first step in Google authentication will involve
// redirecting the user to google.com.  After authorization, Google
// will redirect the user back to this application at /auth/google/callback
router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get(
    '/google/callback', 
    passport.authenticate('google', 
    { failureRedirect: process.env.CLIENT_URL },
    function(req, res) {
        res.redirect(`${process.env.CLIENT_URL}/`);
    }
));

router.post("/login/success", authController.login);

router.post("/logout", authController.logout);

module.exports = router;