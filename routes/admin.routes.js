const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin.controllers");

const {verifyAdmin} =require("../services/auth")

router.get("/clubreq",verifyAdmin,adminController.getClubReq);


module.exports = router;
