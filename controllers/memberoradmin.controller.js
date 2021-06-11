const clubAdminAccounts=require("../model/admin.module");
const clubMembers =require("../model/member.model");


exports.getProfile = async (req, res, next) => {
    try{
        let user = await clubMembers.findById({_id:res.locals.user._id}).select("email fullName mobileNumber gender specialization role branch year imageUrl");
        if(!user){
            user = await clubAdminAccounts.findById({_id:res.locals.user._id}).select("email fullName mobileNumber gender specialization role branch year imageUrl");
        }
        return res.success(`Profile Details`,user);
    }
    catch(err){

    }
};
exports.getClubMembers = async (req, res, next) => {
    try{
        let members = await clubMembers.find().select("email fullName mobileNumber gender specialization role branch year imageUrl teams");
        return res.success(`Members`,members);
    }
    catch(err){

    }
};
