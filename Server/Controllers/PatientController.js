import { configDotenv } from "dotenv";
configDotenv();
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import PatientModel from "../Models/PatientModel.js";
import { createOTP } from "../Services/CreateOTP.js";
import OTPmodel from "../Models/OTPmodel.js";
import AdminModel from "../Models/AdminModel.js";


export const signupController = async (req, res) => {

    const err = validationResult(req);
    if (!err.isEmpty()) { return res.status(400).json({ errors: err.array() }) }

    try {

        const { fullname, email, password } = req.body;

        const doesExist = await PatientModel.findOne({ email });
        if (doesExist) { return res.status(400).json({ errors: [{ msg: "Email already exists" }] }) }

        await createOTP(email);

        const user = await PatientModel.create({ fullname, email, password });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.cookie('token', token, {
            httpOnly: true,
            secure: true, // set to true in prod over HTTPS
            sameSite: 'none',
        });

        res.status(201).json({ msg: "OTP sent and Account created successfully", user, token })

    } catch (error) {
        console.log(error)
        res.status(500).json({ errors: [{ msg: error.message }] })
    }
}




export const loginController = async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) { return res.status(400).json({ errors: err.array() }) };
    const { email, password } = req.body;

    const user = await PatientModel.findOne({ email });
    if (!user) { return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] }) }

    try {

        const isMatch = await user.matchPassword(password);
        if (!isMatch) { return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] }) }
        // if (user.verified === 'false') {
        //     return res.status(400).json({ errors: [{ msg: "Email not verified. Please verify your email to login." }] })
        // }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.cookie('token', token, {
            httpOnly: true,
            secure: true, // set to true in prod over HTTPS
            sameSite: 'none',
        });
        res.status(200).json({ msg: "Login successful", user })
    } catch (error) {
        console.log(error)
        res.status(500).json({ errors: [{ msg: error.message }] })
    }

}



export const verifyOTPController = async (req, res) => {
    const { OTP } = req.body;
    const token = req.cookies.token;
    if (!token) { return res.status(401).json({ errors: [{ msg: "NOt authorized" }] }) }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userID = decoded.id;
        const user = await PatientModel.findById(userID);
        if (!user) { return res.status(400).json({ errors: [{ msg: "User not found" }] }) }

        const findOTP = await OTPmodel.findOne({ email: user.email });
        if (!findOTP) { return res.status(400).json({ errors: [{ msg: "OTP expired. Please request a new one." }] }) }
        const isMatch = String(findOTP.OTP).trim() === String(OTP).trim();

        if (!isMatch) { return res.status(400).json({ errors: [{ msg: "Invalid OTP" }] }) }
        user.verified = 'true';
        await user.save();
        await OTPmodel.deleteMany({ email: user.email });
        res.status(200).json({ msg: "Email verified successfully", user })

    } catch (error) {
        console.log(error)
        res.status(500).json({ errors: [{ msg: error.message }] })
    }
}



export const resendOTPController = async (req, res) => {
    const token = req.cookies.token;
    if (!token) { return res.status(401).json({ errors: [{ msg: "Not authorized" }] }) }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await PatientModel.findById(decoded.id);
        if (!user) { return res.status(400).json({ errors: [{ msg: "User not found" }] }) }


        const sendOTP = await createOTP(user.email);

        res.status(200).json({ msg: "OTP sent successfully" })



    } catch (error) {

        console.log(error)
        res.status(500).json({ errors: [{ msg: error.message }] })

    }
}


export const getProfileController = async (req, res) => {

    try {

        const user = req.user;
        res.status(200).json({ user })

    } catch (error) {
        console.log(error)
        res.status(500).json({ errors: [{ msg: error.message }] })

    }
}

export const logoutCOntroller = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true, // set to true in prod over HTTPS
            sameSite: 'none',
        });
        return res.status(200).json({ message: 'Logged out successfully' });

    } catch (error) {
        console.error(err);
        return res.status(500).json({ message: 'Logout failed' });
    }
}


export const saveInfoControler = async (req, res) => {
    const { phone, address, age, gender } = req.body;
    const file = req.file
    const userID = req.user._id

    try {
        const user = await PatientModel.findByIdAndUpdate(userID, {
            phone: phone,
            address: address,
            age: age,
            gender: gender,
            profilePic: req.file?.filename
        }, { new: true })
        res.json({ user });

    } catch (error) {

        console.log(error)
        res.status(500).json({ success: false, error: error.message });

    }
}


// ADMIN CONTROLLERS
export const adminSignupController = async (req, res) => {
    console.log('REQ.BODY >>>', req.body);
    const err = validationResult(req);
    if (!err.isEmpty()) { return res.status(400).json({ errors: err.array() }) }


    const { fullname, email, password, role } = req.body;
    try {
        const doesExist = await AdminModel.findOne({ email });
        if (doesExist) { return res.status(400).json({ errors: [{ msg: "Email already exists" }] }) }
        console.log('About to create:', {
            fullname,
            email,
            password,
            role
        });
        const user = await AdminModel.create({ fullname, email, password, role });

        res.status(200).json({ message: "Admin added successfully", user });

    } catch (error) {
        console.log(error)
        res.status(400).json({ errors: error })
    }
}



export const adminlogin = async (req , res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) { return res.status(400).json({ errors: err.array() }) }
    const {email , password} = req.body

    const admin = await AdminModel.findOne({email})
    if(!admin) { return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] }) }

    try {
        const isMatched = await admin.matchPassword(password);
        if(!isMatched) { return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] }) }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET)
        res.cookie('token', token, {
            httpOnly: true,
            secure: true, // set to true in prod over HTTPS
            sameSite: 'none',
        });
        res.status(200).json({ msg: "Login successful", admin })
        
    } catch (error) {
           console.log(error)
        res.status(500).json({ errors: [{ msg: error.message }] })
    }

}