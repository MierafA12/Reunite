import axios from "axios";

const API_URL = "/api";
const CSRF_URL = "/sanctum/csrf-cookie";

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },
});

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("reunite_user");
            // Only redirect if not on auth pages to avoid loops
            if (typeof window !== "undefined" && !window.location.pathname.startsWith("/auth")) {
                window.location.href = "/auth/login";
            }
        }
        return Promise.reject(error);
    }
);

export const authApi = {
    getCsrfCookie: async () => {
        return await axios.get(CSRF_URL, {
            withCredentials: true,
        });
    },
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
    logout: async () => {
        const response = await api.post("/logout");
        return response.data;
    },
};

export const profileApi = {
    getUserProfile: async () => {
        const response = await api.get("/profile");
        return response.data;
    },
    updateProfile: async (data: any) => {
        const response = await api.post("/profile/update", data);
        return response.data;
    },
};

export const reportApi = {
    submitReport: async (formData: FormData) => {
        const response = await api.post("/reports", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },
    getUserReports: async () => {
        const response = await api.get("/reports");
        return response.data;
    },
    getPublicReports: async () => {
        const response = await api.get("/public/reports");
        return response.data;
    },
    getReport: async (id: string) => {
        const response = await api.get(`/reports/${id}`);
        return response.data;
    },
    updateReport: async (id: string, data: any) => {
        const response = await api.put(`/reports/${id}`, data);
        return response.data;
    },
    deleteReport: async (id: string) => {
        const response = await api.delete(`/reports/${id}`);
        return response.data;
    },
};

export default api;
