const clubAcc = require("../model/accounts.model");

const { hashSync, compareSync } = require("bcrypt-nodejs");

const passport = require("passport");

const GoogleStategy = require("passport-google-oauth2").Strategy;

const constants = require("../config/constants");

passport.use(
  new GoogleStategy(
    {
      clientID:process.env.CLIENT_Id,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/signup/google/callback",
      passReqToCallback: true,
    },
    async function (request,accessToken, refreshToken, profile, done) {
      const user = await clubAcc.findOne({ email: profile.email });
        if(!user && request.url.toString().slice(0, 23) === "/signup/google/callback"){
            const newUser =new clubAcc({
                email: profile.email,
                fullName: profile.displayName,
                googlePassword:hashSync(profile.email+profile.displayName),
                status: constants.ACTIVE
            });
            await newUser.save();
            return done(null,profile);
        }
        else if(user){
            if(compareSync(profile.email+profile.displayName,user.googlePassword)){
                return done(null,profile);
            }else{
                throw new Error(`Password is not Match`)
            }
        }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
