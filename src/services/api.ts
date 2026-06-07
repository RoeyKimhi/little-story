import axios from "axios";
import { AUTH_TOKEN_KEY } from "@/types/auth";

const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const apiClient = axios.create({
  baseURL: apiUrl,
  // Sequential FAL (6 images) + GPT can exceed 5 minutes.
  timeout: 600_000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
