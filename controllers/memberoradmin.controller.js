const clubAdminAccounts = require("../model/admin.module");
const clubMembers = require("../model/member.model");

const s3=require("../config/s3")

exports.getProfile = async (req, res, next) => {
  try {
    let user = await clubMembers
      .findById({ _id: res.locals.user._id })
      .select(
        "email fullName mobileNumber gender specialization role branch year imageUrl"
      );
    if (!user) {
      user = await clubAdminAccounts
        .findById({ _id: res.locals.user._id })
        .select(
          "email fullName mobileNumber gender specialization role branch year imageUrl"
        );
    }
    return res.success(`Profile Details`, user);
  } catch (err) {}
};

exports.getClubMembers = async (req, res, next) => {
  try {
    let members = await clubMembers
      .find({ email: { $ne: res.locals.user.email } })
      .select(
        "email fullName mobileNumber gender specialization role branch year imageUrl teams"
      );
    return res.success(`Members`, members);
  } catch (err) {}
};

exports.getTeamMembers = async (req, res, next) => {
  try {
    const members = await clubMembers
      .find({ email: { $ne: res.locals.user.email } })
      .select(
        "email fullName mobileNumber gender specialization role branch year imageUrl teams"
      );
    const teamMembers = [];
    members.forEach((member) => {
      res.locals.user.teams.forEach((teamUser) => {
        member.teams.forEach((teamMember) => {
          if (teamMember.toString() === teamUser.toString()) {
            teamMembers.push(member);
          }
        });
      });
    });
    return res.success(`Team Members`, teamMembers);
  } catch (err) {}
};

exports.postUpdateProfile = async (req, res, next) => {
    try {
        const data=await s3.uploadFile(req.file);
        let user= await clubMembers.findOne({ email: res.locals.user.email });
        if(!user){
            user= await clubAdminAccounts.findOne({ email: res.locals.user.email });
        }
        user.imageUrl=data.Location;
        await user.save();
        return res.success(`Profile upload successfully`)
    } catch (err) {}
  };

  exports.postEditProfile = async (req, res, next) => {
    try {
        let user= await clubMembers.findOne({ email: res.locals.user.email });
        if(!user) {
            user=await clubAdminAccounts.findOne({ email: res.locals.user.email });
        }

        return res.success(`Updated`);
    } catch (err) {}
  };
