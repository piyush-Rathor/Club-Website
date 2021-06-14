const express = require('express');

const router = express.Router();

const loginController = require('../controllers/login.controllers');

const validationMiddleware =require('../services/validation.middleware');
const validationSchema = require('../services/validation');

const {verify} =require('../services/auth');

router.post('/email',validationMiddleware(validationSchema.blogLogin),loginController.postLogin);

module.exports = router;

