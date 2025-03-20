const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
    async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id} , {displayName:profile.displayName});
        if (!user) {
            user = await User.create({
                googleId: profile.id,
                displayName: profile.displayName || profile.name.given_name + ' ' + profile.name.family_name,
            });
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
  }
));



// serialize and unserialize user../
passport.serializeUser(function (user, cb) {
    console.log("serialized user is ", user);
        return cb(null, user);
});


passport.deserializeUser(async function (user, cb) {
      return cb(null, user);
});


const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.redirect("/");
    }
    return next();
};

module.exports = { passport, isAuthenticated };