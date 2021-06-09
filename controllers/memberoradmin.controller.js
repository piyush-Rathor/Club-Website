const clubAdminAccounts=require("../model/admin.module");
const clubMembers =require("../model/member.model");


exports.postLogin = async (req, res, next) => {
    try{
        let user = await clubMembers.findById({_id:res.locals.user._id}).select("email fullName mobileNumber gender Specialization role branch");
        if(!user){
            user = await clubAdminAccounts.findById({_id:res.locals.user._id}).select("email fullName mobileNumber gender Specialization role branch");
        }
        return res.success(`Profile Details`,user);
    }
    catch(err){

    }
};
