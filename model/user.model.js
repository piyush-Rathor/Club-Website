const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
      def: "",
    },
    email: {
      type: String,
      trim: true,
      req: true,
    },
    mobileNumber:{
        type:String,
        trim:true,
        req:true
    },
    password:{
        type:String,
        trim:true,
        req:true   
    },
    imageUrl:{
        type:String,
        trim:true,
        def:""
    },
    roleId:{
        type:Schema.Types.ObjectId,
        ref:"role"
    },
    status:{
        type:Boolean,
        def:true
    }
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.getUser = async ()=> {
    return this;
  };

userSchema.methods.updateUser = async (body)=> {
    const updatedUser = {
        ...this,
        firstName:body.firstName || this.firstName,
        lastName:body.lastName || this.lastName,
        email:body.email || this.email,
        mobileNumber:body.mobileNumber || this.mobileNumber,
        imageUrl:body.imageUrl || this.imageUrl,
        roleId:body.roleId || this.roleId,
        status:body.status || this.status
    }
    return updatedUser.save();
  };

module.exports = mongoose.model("user", userSchema);
