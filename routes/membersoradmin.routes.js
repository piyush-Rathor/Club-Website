const express = require('express');

const router = express.Router();

const memberoradminController = require('../controllers/memberoradmin.controller');

const upload=require('../config/multer')

const {verifyMemberorAdmin} =require('../services/auth')

router.get('/profile',verifyMemberorAdmin,memberoradminController.getProfile);

router.get('/getmembers',verifyMemberorAdmin,memberoradminController.getClubMembers);

router.get('/getteammembers',verifyMemberorAdmin,memberoradminController.getTeamMembers);

router.post('/profile/upload',verifyMemberorAdmin,upload,memberoradminController.postUpdateProfile);


module.exports = router;

