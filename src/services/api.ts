import axios from "axios";

const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const apiClient = axios.create({
  baseURL: apiUrl,
  timeout: 300000, // 5 minutes to allow for long-running API calls
});

// You can add request/response interceptors here in the future
// For example, adding auth tokens:
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("authToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
