import AppointmentModel from "../Models/AppointmentModel.js";


export const bookAppointmentController = async (req, res) => {
    const { date, day, docID, PatientID, hour, minutes } = req.body;
    if (!date || !day || !docID || !PatientID || !hour || !minutes) {
        return res.status(400).json({ message: 'Please select time & date to book your slot' });
    }
 try {


    const existingAppointment = await AppointmentModel.findOne({
        docID,
        date,
        hour,
        minutes,
    });
    if (existingAppointment) {
        return res.status(409).json({ message: 'This slot is already booked.' });
    }

    const appointment = await AppointmentModel.create({
        docID,
        PatientID,
        date,
        day,
        hour,
        minutes
    })

    res.status(200).json({
      message: 'Appointment booked successfully.',
      appointment,
    });

    
 } catch (error) {
    
    console.log(error)
    res.status(400).json({
        message:"internel server error",
        error,
    })
 }
}

export const getMyAppointments = async (req , res) => {
    const {PatientID} = req.body;
    if(!PatientID){ return res.status(400).json({message:'PatientID is required'})}
   
    try {

        const appointmentList = await AppointmentModel.find({PatientID}).sort({date:1 , hour:1,});
        res.status(200).json({
            message:"Appointments fetched successfully",
            appointmentList:appointmentList,
        })


        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message:"Internel Server Error",
            error:error,
        })
    }
}


export const cancelAppointment = async (req , res) => {
    const {_id} = req.body;
    if(!_id){res.status(400).json({message:"Appointment ID is required to delete Appointment"})}
    
    try {
        const appointmentList = await AppointmentModel.findByIdAndDelete(_id)
        res.status(200).json({message:'Appointment deleted succesfully'})
    } catch (error) {

        console.log(error)
        res.status(400).json({
            error: error,
            message:'Internal server error',
                })


        
    }
}