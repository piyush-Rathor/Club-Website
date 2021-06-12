const express = require('express');

const router = express.Router();

const memberoradminController = require('../controllers/memberoradmin.controller');

const upload=require('../config/multer')

const {verifyMemberorAdmin} =require('../services/auth')

router.get('/profile',verifyMemberorAdmin,memberoradminController.getProfile);

router.get('/getmembers',verifyMemberorAdmin,memberoradminController.getClubMembers);

router.get('/getteammembers',verifyMemberorAdmin,memberoradminController.getTeamMembers);

router.post('/picture/profile/upload',verifyMemberorAdmin,upload.single('image'),memberoradminController.postUpdateProfile);

router.post('/profile/edit',verifyMemberorAdmin,memberoradminController.postEditProfile);


module.exports = router;

