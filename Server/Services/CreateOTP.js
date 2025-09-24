import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
import OTPmodel from "../Models/OTPmodel.js";


export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

export async function sendOTPEmail(email, otp) {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`
  };

  try {

     await transporter.sendMail(mailOptions);
    

  } catch (err) {
    console.error("Error sending OTP email:", err);
    throw new Error("Could not send OTP email" + err.message);
  }
}


export const createOTP = async (email) => {

  await OTPmodel.deleteOne({ email }) 
  const otp = Math.floor(100000 + Math.random() * 900000);

  try {

    await OTPmodel.create({ email, OTP: otp })
     await sendOTPEmail(email, otp);


  } catch (error) {
    console.log(error.message)
  }
}





