import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: String,
  OTP: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300 // 300 seconds = 5 minutes
  }
});

const OTPmodel = mongoose.model("OTP", otpSchema);
export default OTPmodel;
