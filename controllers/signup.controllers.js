const clubAcc = require("../model/accounts.model");

const { hashSync, compareSync } = require("bcrypt-nodejs");

const { send } = require("../utils/mailer.utils");

const constants = require("../config/constants");

// const passport = require("passport");
// const googleStrategy = require("passport-google-oauth20");
// passport.use(
//   new googleStrategy(
//     {
//       clientID: process.env.CLIENT_Id,
//       clientSecret: process.env.CLIENT_SECRET,
//       callbackUrl: "/signup/signinbygoogle2",
//     },
//     (accessToken, refreshToken, profile, done) => {
//       console.log(accessToken, refreshToken, profile, done);
//     }
//   )
// );
exports.postOtp = async (req, res, next) => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Your Password and Confirm Password are not Match");
  }
  send(req.body.email, "Your Unnat Technical Club Otp", "Nothing", otp);
  const user = await clubAcc.findOne({ email: req.body.email });
  if (!user) {
    clubAccUser = new clubAcc({
      email: req.body.email,
      password: hashSync(req.body.password),
      fullName: req.body.firstName + " " + req.body.lastName,
      mobileNumber: req.body.mobileNumber,
      otp: hashSync(otp),
      status: constants.SEMIACTIVE,
    });
    const accUser = await clubAccUser.save();
    return res.send(`Otp Send successfully`);
  } else {
    if (compareSync(req.body.password, user.password)) {
      user.otp = hashSync(otp);
      user.save();
      return res.send(`Your Otp Updated`);
    } else {
      return res.send(`Your Password is not correct`);
    }
  }
};

exports.confirmPostOtp = async (req, res, next) => {
  const user = await clubAcc.findOne({ email: req.body.email });
  if (user) {
    if (compareSync(req.body.otp, user.otp)) {
      user.otp = undefined;
      user.status = constants.ACTIVE;
      await user.save();
      return res.send(`Otp Match successfully`);
    } else {
      return res.send(`Otp is not correct`);
    }
  } else {
    return res.send("No User Found");
  }
};

exports.forgetGetOtp = async (req, res, next) => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  const user = await clubAcc.findOne({ email: req.body.email });
  if (user) {
    send(req.body.email, "Your Unnat Technical Club Otp", "Nothing", otp);
    user.otp = hashSync(otp);
    await user.save();
    return res.send("Otp Send successfully");
  } else {
    return res.send("No User Found with this Email");
  }
};
exports.submitForgetGetOtp = async (req, res, next) => {
  const user = await clubAcc.findOne({ email: req.body.email });

  if (user) {
    if (compareSync(req.body.otp, user.otp)) {
      return res.send(`Otp Match successfully`);
    } else {
      return res.send(`Otp not Match`);
    }
  } else {
    return res.send("No User Found with this Email");
  }
};
exports.submitForgetPassword = async (req, res, next) => {
  const user = await clubAcc.findOne({ email: req.body.email });
  if (user) {
    if (compareSync(req.body.otp, user.otp)) {
      if (
        req.body.password.toString() === req.body.confirmPassword.toString()
      ) {
        user.password = hashSync(req.body.password);
        user.otp = undefined;
        user.status = constants.ACTIVE;
        await user.save();
        return res.send(`Your Password Updated`);
      } else {
        return res.send(`Your Password and Confirm Password are not Match`);
      }
    } else {
      return res.send(`Otp not Match`);
    }
  } else {
    return res.send("No User Found with this Email");
  }
};

// exports.signInByGoogle = async (req, res, next) => {
//    console.log("First");
//    passport.authenticate("google",{scope:["profile","email"]})
// };

// exports.signInByGoogleTest = async (req, res, next) => {
//     console.log("Second");
//    passport.authenticate("google");
// };
