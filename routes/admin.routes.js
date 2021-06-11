const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin.controllers");

const {verifyAdmin} =require("../services/auth")

router.get("/clubreq",verifyAdmin,adminController.getClubReq);

router.patch("/acceptreq",verifyAdmin,adminController.acceptReq);

router.post("/rejectedreq",verifyAdmin,adminController.rejectReq);

router.post("/removemember",verifyAdmin,adminController.removeMember);

module.exports = router;
