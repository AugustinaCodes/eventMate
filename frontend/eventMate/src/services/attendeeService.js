import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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

export async function createAttendee(attendeeData) {
  const response = await axiosInstance.post(
    `${API_URL}/main/attendees`,
    attendeeData
  );
  return response.data;
}

export async function getAttendees() {
  const response = await axiosInstance.get(`${API_URL}/main/attendees`);
  return response.data;
}

export async function updateAttendee(attendeeId, updatedData) {
  const response = await axiosInstance.put(
    `${API_URL}/main/attendees/${attendeeId}`,
    updatedData
  );
  return response.data;
}

export async function deleteAttendee(attendeeId) {
  const response = await axiosInstance.delete(
    `${API_URL}/main/attendees/${attendeeId}`
  );
  return response.data;
}
