const express = require("express");

const passport= require("passport");

const router = express.Router();

const signUpController = require("../controllers/signup.controllers");


const validationMiddleware =require('../services/validation.middleware');
const validationSchema = require('../services/validation');

router.post("/postotp", validationMiddleware(validationSchema.blogCreateAccountSendOpt),signUpController.postOtp);

router.post("/confirmpostotp", validationMiddleware(validationSchema.blogCreateAccountPostOpt),signUpController.confirmPostOtp);

router.post("/forgetotp", validationMiddleware(validationSchema.blogForgetPasswordOtp), signUpController.forgetGetOtp);

router.post("/submitforgetotp", validationMiddleware(validationSchema.blogForgetSubmitPasswordOtp), signUpController.submitForgetGetOtp);

router.post("/submitforgetpassword", validationMiddleware(validationSchema.blogForgetSubmitPassword), signUpController.submitForgetPassword);

function isLoggedIn(req, res, next) {
    req.user?next():res.sendStatus(401);
}

router.get("/protected",isLoggedIn, (req, res) => {
    return res.send(`Your Data`);
  });
  
router.get("/auth/failure", (req, res) => {
    res.send(`Something Went Wrong!!`);
});

module.exports = router;
