const express = require("express");

const router = express.Router();

const signUpController = require("../controllers/contact.controllers");


router.post("/mail", signUpController.sendMaintoClub);


module.exports = router;
