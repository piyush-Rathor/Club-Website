const clubAcc = require("../model/accounts.model");
const clubAdminAccounts=require("../model/admin.module");
const clubMembersAccounts=require("../model/member.model");

const { hashSync, compareSync } = require("bcrypt-nodejs");

const jwt = require("jsonwebtoken");

exports.postLogin = async (req, res, next) => {
  const { loginEmail, loginPassword } = req.body;
  if (!loginEmail || !loginPassword) {
    return res.status(400).json({ message: "Email and Password are required" });
  }
  const userGenral = await clubAcc
    .findOne({ email: loginEmail })
    .select("email password status role fullName mobileNumber");
    const userAdmin = await clubAdminAccounts.findOne({ email: loginEmail}).select("email password status role fullName mobileNumber");
    const userMember = await clubMembersAccounts.findOne({ email: loginEmail}).select("email password status role fullName mobileNumber");
    let user=userGenral || userMember || userAdmin;
  if (!user) {
    return res.status(400).json({ message: `No User Exist with this Email` });
  } else {
    if (!user.password) {
      return res.status(400).json({ message: `Password is incorrect` });
    }
    if (compareSync(loginPassword, user.password)) {
      const token = jwt.sign(
        {
          _id: user.__id,
          email: user.email,
          fullName: user.fullName,
          mobileNumber: user.mobileNumber,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d", // expires in 24 hours
        }
      );
      return res.success(`Your Password is Correct`, {
        token,
        email: user.email,
        fullName: user.fullName,
        mobileNumber: user.mobileNumber,
        role: user.role,
      });
    } else {
      return res.unauthorizedUser(`Your password is incorrect`);
    }
  }
};
