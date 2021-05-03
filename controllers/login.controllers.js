const clubAcc = require("../model/accounts.model");

const { hashSync, compareSync } = require("bcrypt-nodejs");

exports.postLogin = async (req, res, next) => {
  const user = await clubAcc
    .findOne({ email: req.body.loginEmail })
    .select("email password status");
  if (!user) {
    return res.send(`No User Exist with this Email`);
  } else {
    if (compareSync(req.body.loginPassword, user.password)) {
      return res.send(`Your Password is Correct`);
    }
    else{
        return res.send(`Your password is incorrect`);
    }
  }
};
