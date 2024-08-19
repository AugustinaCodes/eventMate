import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem("token");

// Create an instance of axios with default headers
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to include the token in every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function getEvents() {
  const response = await axiosInstance.get(`${API_URL}/main/events`,);
  return response.data;
}

export async function createEvent(eventData) {
  const response = await axiosInstance.post(`${API_URL}/main/events`, eventData);
  return response.data;
}

export async function updateEvent(eventId, eventData) {
  const response = await axiosInstance.put(`${API_URL}/main/events/${eventId}`, eventData);
  return response.data;
}

export async function deleteEvent(eventId) {
  const response = await axiosInstance.delete(`${API_URL}/main/events/${eventId}`);
  return response.data;
}
