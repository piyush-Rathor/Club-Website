const requestUser = require("../model/clubreq.model");
const UserAccount = require("../model/accounts.model");

exports.membershipFormSubmit = async (req, res, next) => {
  if (res.locals.role.toString() === "Genral User") {
    const reqUser = await requestUser.findOne({ email: res.locals.email });
    if (reqUser) {
      return res.error(`Your Request is Allready Exist`, reqUser);
    } else {
      const {
        gender,
        teams,
        collegeName,
        collegeYear,
        collegeBranch,
        collegeRollNumber,
        collegeCity,
        collegeState,
        collegeCityPinCode,
      } = req.body;
      const user = new requestUser({
        email: res.locals.user.email,
        password: res.locals.user.password,
        googlePassword: res.locals.user.googlePassword,
        fullName: res.locals.user.fullName,
        mobileNumber: res.locals.user.mobileNumber,
        gender,
        teams: [...teams.replace("[", "").replace("]", "").split(",")],
        college: {
          collegeName,
          collegeYear,
          collegeBranch,
          collegeRollNumber,
          collegeCity,
          collegeState,
          collegeCityPinCode,
        },
      });
      await user.save();
      const genralUser = await UserAccount.findOne({
        email: res.locals.user.email,
      }).select("email membershipReqSent");
      genralUser.membershipReqSent = true;
      await genralUser.save();
      return res.success("Request Sent successfully", {
        email: user.email,
        fullName: user.fullName,
        mobileNumber: user.mobileNumber,
      });
    }
  } else {
    return res.unauthorizedUser();
  }
};
