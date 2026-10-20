import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api/auth` 
  : "/api/auth";

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export const register = async ({ username, email, password }) => {
  const response = await api.post("/register", {
    username,
    email,
    password,
  });
  return response.data;
};

export const login = async ({ email, password }) => {
  const response = await api.post("/login", {
    email,
    password,
  });
  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/get-me");
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/logout");
  return response.data;
};

export const resendVerification = async ({ email }) => {
  const response = await api.post("/resend-verification", { email });
  return response.data;
};