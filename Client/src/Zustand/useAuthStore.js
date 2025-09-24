// Zustand store
import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  checking: false,
  logging: false,
  checking: false,
  resending: false,
  error: null,
  sendingData: false,

  getProfile: async () => {
    set({ checking: true });
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const res = await axios.get(`${apiUrl}/auth/get-Profile`, { withCredentials: true });
      set({ user: res.data.user, checking: false });
    } catch (err) {
      set({ user: null, checking: false });
      console.log(err);
    }
  },

  signup: async (data) => {
    set({ checking: true });
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const res = await axios.post(`${apiUrl}/auth/signup`, data, { withCredentials: true });
      set({ user: res.data, checking: false });

      return { success: true };
    } catch (err) {
      set({ error: err.response?.data?.errors || err.message, checking: false });
      return { success: false };
    }
  },

  login: async (data) => {
    set({ logging: true });
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const res = await axios.post(`${apiUrl}/auth/login`, data, { withCredentials: true });
      set({ user: res.data.user, logging: false });
      return { success: true };
    } catch (err) {
      set({ error: err.response?.data?.errors || err.message, logging: false });
      return { success: false };
    }
  },

  verifyOTP: async (OTP) => {
    set({ checking: true });
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const res = await axios.post(`${apiUrl}/auth/verify-OTP`, { OTP }, { withCredentials: true });
      // backend returns updated user with verified=true
      set({ user: res.data.user, checking: false });
      return { success: true };
    } catch (err) {
      set({ error: err.response?.data?.errors || err.message, checking: false });
      return { success: false };
    }
  },

  resendOTP: async () => {
    set({ checking: true });
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      await axios.post(`${apiUrl}/auth/resend-OTP`, {}, { withCredentials: true });
      set({ checking: false });
      return { success: true };
    } catch (err) {
      set({ checking: false, error: err.response?.data?.errors || err.message });
      return { success: false };
    }
  },

  logout: async () => {
    set({ checking: true })
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await axios.get(`${apiUrl}/auth/logout`, { withCredentials: true });
      set({ user: null, checking: false });

    } catch (error) {
      set({ checking: false, error: error })

    }
  },

  sendEditData: async (formdata) => {

    set({ sendingData: true })
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await axios.post(`${apiUrl}/auth/saveInfo`, formdata,{
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      console.log(response.data.user)
        set({ sendingData: false , user : response?.data?.user})
      toast.success('Profile updated!')
    } catch (error) {
        set({ sendingData: false })
      console.log(error)
      toast.error("Error updating profile")

    }

  }
}));
