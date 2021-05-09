const express = require("express");

const router = express.Router();

const genralUserController=require("../controllers/genraluser.controllers")

const {verify}= require("../services/auth");

router.post("/submit/form",verify,genralUserController.membershipFormSubmit);

module.exports = router;
