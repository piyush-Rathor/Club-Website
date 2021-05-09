const express = require("express");

const passport= require("passport");

const router = express.Router();

const signUpController = require("../controllers/signup.controllers");

router.post("/postotp", signUpController.postOtp);

router.post("/confirmpostotp", signUpController.confirmPostOtp);

router.post("/forgetotp", signUpController.forgetGetOtp);

router.post("/submitforgetotp", signUpController.submitForgetGetOtp);

router.post("/submitforgetpassword", signUpController.submitForgetPassword);

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
