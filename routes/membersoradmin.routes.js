const express = require('express');

const router = express.Router();

const memberoradminController = require('../controllers/memberoradmin.controller');

const {verifyMemberorAdmin} =require('../services/auth')

router.get('/profile',verifyMemberorAdmin,memberoradminController.postLogin);

module.exports = router;

