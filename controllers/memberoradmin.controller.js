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
        let user = await clubMembers.findById({_id:res.locals.user._id}).select("email fullName mobileNumber gender specialization role branch year imageUrl");
        return res.success(`Members`,user);
    }
    catch(err){

    }
};
