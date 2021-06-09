const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clubMemberSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
    },
    googlePassword: {
      type: String,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    teams: [{ type: String, trim: true }],
    college: {
      collegeName: {
        type: String,
        trim: true,
        required: true,
      },
      collegeYear: {
        type: String,
        required: true,
      },
      collegeBranch: {
        type: String,
        required: true,
        trim: true,
      },
      collegeRollNumber: {
        type: String,
        required: true,
      },
      collegeCity: {
        type: String,
        trim: true,
      },
      collegeState: {
        type: String,
        trim: true,
      },
      collegeCityPinCode: {
        type: Number,
        trim: true,
      },
    },
    message: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      def: "https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg",
    },
    specialization: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      trim: true,
      required: true,
    },
    branch:{
      type: String,
      trim: true,
    },
    year:{
      type:String,
      trim:true,
    }
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("ClubMembers", clubMemberSchema);