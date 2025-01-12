import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001", // URL base de tu JSON Server
});

export default api;