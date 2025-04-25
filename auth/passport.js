const User = require("../models/userModel");
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(passport) {

    // serialize the user.id to save in the cookie session
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    // deserialize the cookie UserId to user in the database
    passport.deserializeUser(async ({ _id }, done) => {
        try {
            const user = await User.findOne({ "uid": _id})
            done(null, user);
        } catch (error) {
            done(error);
        }
    });

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: `${process.env.API_URL}/auth/facebook/callback`,
        profileFields : ['id', 'displayName', 'photos']
    },
        async (req, accessToken, refreshToken, profile, done) => {

            try{

                // find current user in UserModel
                const user = await User.findOne({"uid": profile._json.id});

                if (user) {
                    done(null, user);
                }else {

                    const newUser = new User({
                        uid	: profile._json.id,
                        username: profile._json.name
                    });   

                    newUser.save(function(err) {

                        if (err) return done(err)
                            
                        done(null, newUser);

                    });

                }

            } catch(error) {
                return done(error)
            }

        }

    ));

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.API_URL}/auth/google/callback`
    },
        async (accessToken, refreshToken, profile, done) => {

            try{

                // find current user in UserModel
                const user = await User.findOne({"uid": profile.id});

                if (user) {
                    done(null, user);
                }else {

                    const newUser = new User({
                        uid	: profile.id,
                        username: profile.displayName
                    });   

                    newUser.save(function(err) {

                        if (err) return done(err)
                            
                        done(null, newUser);

                    });

                }

            } catch(error) {
                return done(error)
            }

        }
    ));

};