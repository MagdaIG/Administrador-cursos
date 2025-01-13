import axios from "axios";

const api = axios.create({
    baseURL: "https://administrador-cursos.onrender.com", // URL base de tu JSON Server
});

export default api;