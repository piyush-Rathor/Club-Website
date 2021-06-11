const express = require("express");

const router = express.Router();

const userController = require("../controllers/user.controllers");

const {verifyAdmin} =require("../services/auth")

router.post("/",userController.createUser);


module.exports = router;
