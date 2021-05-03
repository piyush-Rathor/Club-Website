const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clubAccSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  password:{
    type:String,
    required:true,
    trim: true
  },
  fullName:{
      type:String,
      required:true,
      trim: true
  },
  mobileNumber:{
      type:Number,
      required:true
  },
  otp:{
      type:String,
      trim: true
  },
  status:{
    type:Number,
    trim: true,
    required:true
  }
},  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model('ClubAccUsers', clubAccSchema);
