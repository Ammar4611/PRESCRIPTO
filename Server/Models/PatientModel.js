import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const patientSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
    },
    verified:{
        type: String,
        default: 'false',
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
        trim: true,
    },
    age: {
        type: String,

        trim: true,
    },
    gender:{
        type: String,
        trim: true,
    },
    profilePic:{
        type: String,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
    myAppointments:[
        { type: mongoose.Schema.Types.ObjectId,
           ref: 'Appointment' ,
           createdAT: { type: Date, default: Date.now },
           stauts: { type: String, enum: ['scheduled', 'completed', 'canceled'], default: 'scheduled'},
        }
    ]
})

    // Hash password before saving
    patientSchema.pre("save", async function (next) {
        if (!this.isModified("password")) {
            return next();
        }
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    })

    // Method to compare password
    patientSchema.methods.matchPassword = async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
    }
    
const PatientModel = mongoose.model("Patient", patientSchema);
export default PatientModel;