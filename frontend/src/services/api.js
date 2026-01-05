import axios from "axios"

const api = axios.create({
    baseURL:import.meta.env.VITE_BACKEND_API
})

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error?.response?.data?.error ||
      error?.message ||
      "Something went wrong";

    return Promise.reject(message);
  }
);

export default api;