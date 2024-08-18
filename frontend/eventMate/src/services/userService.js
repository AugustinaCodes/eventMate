import axios from "axios";

const API_BASE_URL = "http://localhost:4000";

export async function registerUser(userdata){
    const response = await axios.post(`${API_BASE_URL}/register`, userdata);

    return response.data;
}