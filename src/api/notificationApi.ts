import axios from "axios";
import { baseUrl } from "../baseUrl";

const API = axios.create({ 
  baseURL: baseUrl 
});

// Automatically add auth token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 unauthorized globally (optional redirect to login)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const getAllNotifications = () => API.get("/notification/getNotifications");

export const getUnreadNotificationCount = () => API.get("/notification/unreadCount");

export const markAsChecked = (id: string) => API.put(`/notification/mark/${id}`, {});

export const markAllAsChecked = () => API.put("/notification/markAll", {});

