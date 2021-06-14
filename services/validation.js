const Joi = require("joi");
const type = {
  email: Joi.string()
    .required()
    .lowercase()
    .email({ minDomainSegments: 2 })
    .message("Please enter a valid email address"),
  otp: Joi.number()
    .integer()
    .min(0000)
    .max(9999)
    .message("Please Enter valid otp")
    .required(),
  password: Joi.string()
    .required()
    .pattern(
      new RegExp(
        "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[@#$%^&+=])"
      )
    )
    .message(
      "Password and Confirm Password must cantain 8-20 Characters ,at least 1 in LowerCase,at least 1 With UpperCase and atleast 1 Special Character"
    ),
  firstName: Joi.string()
    .required()
    .min(3)
    .message("Please Enter a Valid First Name"),
    lastName:Joi.string().allow('').allow(null),
  gender: Joi.any().valid("Male", "FeMale").required(),
  teams:(value, helpers)=>{
    if (!value.includes("Technical-Team") && !value.includes("Documentation-Team") && !value.includes("Management-Team") && !value.includes("Designing-Team")) {
        return helpers.error("Something Went wrong");
      }
      return value;
  },
  collegeYear:Joi.string().valid("First Year","Secound Year","Third Year","Fourth Year"),
  collegeBranch:Joi.string().valid("CSE","ECE","EE","CE","Other"),
  collegeRollNumber:Joi.string().required(),
  collegeCity:Joi.string().min(3).message("Please Enter valid Input"),
  collegeCityPinCode:Joi.number(),
  message:Joi.string().allow('').allow(null),
  mobileNumber:Joi.number().min(1000000000).max(9999999999).message("Please Enter valid Mobile Number").required()
};
const schemas = {
  blogLogin: Joi.object().keys({
    loginEmail: type.email,
    loginPassword: type.password,
  }),
  blogCreateAccountSendOpt: Joi.object().keys({
    email: type.email,
    password: type.password,
    confirmPassword: Joi.ref("password"),
    firstName: type.firstName,
    mobileNumber: type.mobileNumber,
    lastName: type.lastName
  }),
  blogCreateAccountPostOpt: Joi.object().keys({
    email: type.email,
    password: type.password,
    confirmPassword: Joi.ref("password"),
    firstName: type.firstName,
    mobileNumber: type.mobileNumber,
    lastName: type.lastName,
    otp: type.otp,
  }),
  blogForgetPasswordOtp: Joi.object().keys({
    email: type.email,
  }),
  blogForgetSubmitPasswordOtp: Joi.object().keys({
    email: type.email,
    otp: type.otp,
  }),
  blogForgetSubmitPassword: Joi.object().keys({
    email: type.email,
    otp: type.otp,
    password: type.password,
    confirmPassword: Joi.ref("password"),
  }),
  blogMembershipFormSubmit: Joi.object().keys({
    gender: type.gender,
    teams:Joi.string().custom(type.teams, "custom validation"),
    collegeName:Joi.string().required(),
    collegeYear:type.collegeYear,
    collegeBranch:type.collegeBranch,
    collegeRollNumber:type.collegeRollNumber,
    collegeCity:type.collegeCity,
    collegeState:type.collegeCity,
    collegeCityPinCode:type.collegeCityPinCode,
    message:type.message
  }),
};
module.exports = schemas;
