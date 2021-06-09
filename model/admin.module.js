const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clubAdminSchema = new Schema(
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
      def:"Faculity"
    }
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("ClubAdmins", clubAdminSchema);
