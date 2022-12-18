const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const User = require("../Users/users.model");
const {compareSync} = require("bcrypt");
const bcrypt = require("bcrypt");

passport.use(new LocalStrategy(
    function (username, password, done){
        User.findOne({username : username}, function (err,user){
            if(err) return done(err)
            if(!user) {
                const err = new Error("Not found")
                err.status = 404;
                return done(err);
            }
            if(!bcrypt.compare(password, user.password)) {
                const err = new Error("Not matching")
                err.status = 403;
                return done(err);
            }
            return done(null, user)
        })
    }
))

