import axios from "axios";

const base = `${import.meta.env.VITE_QUOTE_URL}/api/get`;

const api = axios.create({
  baseURL: base,
});

export default api;