const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clubAccSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
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
      trim: true,
    },
    otp: {
      type: String,
      trim: true,
    },
    status: {
      type: Number,
      trim: true,
      required: true,
    },
    token: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      default: "Genral User",
    },
    membershipReqSent: {
      type: Boolean,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("ClubAccUsers", clubAccSchema);
