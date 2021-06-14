const express = require("express");

const router = express.Router();

const genralUserController=require("../controllers/genraluser.controllers")

const validationMiddleware =require('../services/validation.middleware');
const validationSchema = require('../services/validation');

const {verify}= require("../services/auth");

router.post("/submit/form",verify,validationMiddleware(validationSchema.blogMembershipFormSubmit),genralUserController.membershipFormSubmit);

module.exports = router;
