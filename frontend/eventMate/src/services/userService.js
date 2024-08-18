import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function registerUser(userdata){
    const response = await axios.post(`${API_URL}/register`, userdata);

    return response.data;
}