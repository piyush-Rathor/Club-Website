const express = require('express');

const router = express.Router();

const loginController = require('../controllers/login.controllers');

const {verify} =require('../services/auth')

router.post('/email',loginController.postLogin);

module.exports = router;

