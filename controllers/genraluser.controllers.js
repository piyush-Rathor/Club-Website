const requestUser = require("../model/clubreq.model");
const UserAccount = require("../model/accounts.model");

const {send}= require("../utils/mailer.utils")

const htmlEmailMembershipForm=`<p>Hey</p>
<p>Your Request has been sent</p>
<b>You will let you inform Soon</p>`

exports.membershipFormSubmit = async (req, res, next) => {
  try {
    if (res.locals.role.toString() === "Genral User") {
      const teams = req.body.teams.split(" ");
      teams.pop();
      const reqUser = await requestUser.findOne({ email: res.locals.email });
      if (reqUser) {
        return res.error(`Your Request is Allready Exist`, reqUser);
      } else {
        const {
          gender,
          collegeName,
          collegeYear,
          collegeBranch,
          collegeRollNumber,
          collegeCity,
          collegeState,
          collegeCityPinCode,
          message,
        } = req.body;
        const user = new requestUser({
          email: res.locals.user.email,
          password: res.locals.user.password,
          googlePassword: res.locals.user.googlePassword,
          fullName: res.locals.user.fullName,
          mobileNumber: res.locals.user.mobileNumber,
          gender,
          teams: teams,
          college: {
            collegeName,
            collegeYear,
            collegeBranch,
            collegeRollNumber,
            collegeCity,
            collegeState,
            collegeCityPinCode,
          },
          message,
        });
        await user.save();
        send(res.locals.user.email,"MemberShip Request in Unnat Technical Club",htmlEmailMembershipForm,"")
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
  } catch (err) {
    return res.error(`SomeThing Went Wrong`, err);
  }
};
