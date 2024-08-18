import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function registerUser(userdata){
    const response = await axios.post(`${API_URL}/register`, userdata);

    return response.data;
}

export async function checkUsername(username) {
    const response = await axios.get(`${API_URL}/users/check-username/${username}`);
    return response.data.exists;
}