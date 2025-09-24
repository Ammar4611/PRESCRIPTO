import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

export const useAppointmentStore = create((set) => ({
    appointments: [],
    booking: false,
    error: null,

    BookAppointment: async (AppointmentData) => {
        set({ booking: true })

        const apiUrl = import.meta.env.VITE_API_URL
        try {

            const response = await axios.post(`${apiUrl}/appointments/bookAppointment`, AppointmentData)
            set({ booking: false, error: null })
            toast.success("Appointment booked successfully")

        } catch (error) {
            console.log(error);
            set({ booking: false, error: error?.response?.data?.message || 'Something went wrong while booking' })
            toast.error(`${error.response?.data?.message || 'Something went wrong while booking'}`)

        }
    },


    getMyAppointments: async (PatientID) => {

        const apiUrl = import.meta.env.VITE_API_URL

        try {
            const response = await axios.post(`${apiUrl}/appointments/getMyAppointments`, { PatientID: PatientID })
            set({ appointments: response?.data.appointmentList })

        } catch (error) {
            set({ appointments: "" })
            toast.error(`${error.response?.data?.message || 'Error while fetching data'}`)
            console.log(error)
        }

    },

    CancelAppointment:async (cancelID) => {

    const apiUrl = import.meta.env.VITE_API_URL;
    try {
        
        const response = await axios.post(`${apiUrl}/appointments/cancelAppointment`, cancelID)
        toast.success('Appintment canceled successfully')
    } catch (error) {
        console.log(error)
        toast.error(`${error.response?.data?.message || 'Error while cancling appointment'}`)
        
    }
        
    }

}))


