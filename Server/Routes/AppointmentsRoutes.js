import express from 'express'
import { bookAppointmentController, cancelAppointment, getMyAppointments } from '../Controllers/AppointmentController.js'
const AppointmentRouter = express.Router()


AppointmentRouter.post('/bookAppointment' , bookAppointmentController)
AppointmentRouter.post('/getMyAppointments', getMyAppointments)
AppointmentRouter.post("/cancelAppointment", cancelAppointment)

export default AppointmentRouter