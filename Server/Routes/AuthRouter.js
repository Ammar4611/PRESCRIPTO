import express from 'express'
import { loginValidator, signupValidator } from '../Middlewares/expressValidator.js';
import { adminlogin, adminSignupController, getProfileController, loginController, logoutCOntroller, resendOTPController, saveInfoControler, signupController, verifyOTPController } from '../Controllers/PatientController.js';
import { checkAuth } from '../Services/authService.js';
import upload from '../Middlewares/multer.js';


const router = express.Router();


router.post("/signup",signupValidator, signupController);

router.post("/login",loginValidator , loginController);

router.post('/verify-OTP' , verifyOTPController)

router.post('/resend-OTP' , resendOTPController)

router.get("/get-Profile", checkAuth ,getProfileController );

router.get("/logout" ,  logoutCOntroller)

router.post('/saveInfo' ,checkAuth , upload.single('img'), saveInfoControler)



// AdminRoutes

router.post('/admin-Signup', signupValidator , adminSignupController)
router.post("/admin-login" , loginValidator ,adminlogin)

export default router