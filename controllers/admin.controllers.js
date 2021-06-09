const clubMembers =require("../model/member.model");
const clubRequest = require("../model/clubreq.model");

exports.getClubReq = async (req, res, next) => {
    try{
        let requests = await clubRequest.find().select("email fullName teams imageUrl");
        return res.success(`Requests`,requests);
    }
    catch(err){
    }
};
