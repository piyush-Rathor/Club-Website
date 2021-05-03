const express = require("express");

const router = express.Router();

const signUpController = require("../controllers/signup.controllers");

router.post("/postotp", signUpController.postOtp);

router.post("/confirmpostotp", signUpController.confirmPostOtp);

router.post("/forgetotp", signUpController.forgetGetOtp);

router.post("/submitforgetotp", signUpController.submitForgetGetOtp);

router.post("/submitforgetpassword", signUpController.submitForgetPassword);

// router.get("/signinbygoogle", signUpController.signInByGoogle);

// router.get("/signinbygoogle2", signUpController.signInByGoogleTest);


module.exports = router;
