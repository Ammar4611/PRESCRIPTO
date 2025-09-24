import mongoose from "mongoose";


const AppointmentSchema = new mongoose.Schema({

    date:{
        type:String,
        required:true
    },
    day:{
        type:String,
        required:true,
    },

    docID:{
        type:String,
        required:true,
    },

    PatientID:{
        type:String,
        required:true,
    },
    hour:{
        type:String,
        required:true,
    },
    minutes:{
        type:String,
        require:true,

    },
    status:{
        type:String,
        
    }
})

const AppointmentModel = mongoose.model("Appointment" , AppointmentSchema)
export default AppointmentModel