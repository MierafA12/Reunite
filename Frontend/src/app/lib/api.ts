import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("reunite_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // You can handle unified error responses here
        if (error.response?.status === 401) {
            // Handle unauthorized (e.g., redirect to login or clear token)
            localStorage.removeItem("reunite_token");
            localStorage.removeItem("reunite_user");
        }
        return Promise.reject(error);
    }
);

export const authApi = {
    register: async (data: any) => {
        const response = await api.post("/register", data);
        return response.data;
    },
    login: async (data: any) => {
        const response = await api.post("/login", data);
        return response.data;
    },
    forgotPassword: async (data: { email: string }) => {
        const response = await api.post("/forgot-password", data);
        return response.data;
    },
    verifyResetOtp: async (data: { email: string; otp_code: string }) => {
        const response = await api.post("/verify-reset-otp", data);
        return response.data;
    },
    resetPassword: async (data: any) => {
        const response = await api.post("/reset-password", data);
        return response.data;
    },
    verifyEmail: async (data: { otp_code: string }) => {
        const response = await api.post("/email/verify", data);
        return response.data;
    },
    resendVerification: async () => {
        const response = await api.post("/email/verification-notification");
        return response.data;
    },
};

export default api;
