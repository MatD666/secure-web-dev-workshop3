const passport = require("passport");
const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require("../Users/users.model");
require('dotenv').config()

passport.use(
    new jwtStrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },
        async (token, done) => {
            User.findOne({_id : token._id}, function (err,user){
                if(err) return done(err)
                if(!user) return done(null, false, {message : "Something went wrong"})
                return done(null, user._id)
            })
        }
    )
);