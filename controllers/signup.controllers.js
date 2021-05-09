const clubAcc = require("../model/accounts.model");

const { hashSync, compareSync } = require("bcrypt-nodejs");

const { send } = require("../utils/mailer.utils");

const constants = require("../config/constants");

const jwt  = require('jsonwebtoken');

const {OAuth2Client}= require("google-auth-library");
const client=new OAuth2Client(process.env.CLIENT_Id);

exports.postOtp = async (req, res, next) => {
  console.log("Inside Post Otp Controller")
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
  const user = await clubAcc.findOne({ email: req.body.email }).select("email fullName mobileNumber role otp");
  if (user) {
    if (compareSync(req.body.otp, user.otp)) {
      user.otp = undefined;
      user.status = constants.ACTIVE;
      await user.save();
      const token=await jwt.sign({ email:user.email,fullName:user.fullName,mobileNumber:user.mobileNumber,role:user.role,_id:user._id },process.env.JWT_SECRET,{
        expiresIn: "7d", // expires in 24 hours
      });
      return res.success(`Otp Match successfully`,{token,email:user.email,fullName:user.fullName,mobileNumber:user.mobileNumber,role:user.role,_id: user._id});
    } else {
      return res.success(`Otp is not correct`);
    }
  } else {
    return res.success("No User Found");
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
        return res.send(`Your Password Updated You can Signin with your new Password`);
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
