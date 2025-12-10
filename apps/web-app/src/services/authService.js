import apiAxios from "@/lib/apiAxios";
import Cookies from "js-cookie";

const BASE_API_AUTH = "/auth";

export const register = async (email, password, full_name) => {
  const res = await apiAxios.post(`${BASE_API_AUTH}/register`, {
    email,
    password,
    full_name,
  });
  return res.data;
};

export const login = async (email, password) => {
  const res = await apiAxios.post(`${BASE_API_AUTH}/login`, {
    email,
    password,
  });
  return res.data.data;
};

export const getProfile = async () => {
  const token = Cookies.get("token");
  if (!token) throw new Error("No token found");

  const res = await apiAxios.get(`${BASE_API_AUTH}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.data; 
};

export const forgotPassword = async (email) => {
  const res = await apiAxios.post(`${BASE_API_AUTH}/forgot-password`, { email });
  return res.data;
};

export const resetPassword = async (token, new_password) => {
  const res = await apiAxios.post(
    `${BASE_API_AUTH}/reset-password?token=${token}`,
    { new_password }
  );
  return res.data;
};

export const updateProfile = async (full_name, avatar_url) => {
  const res = await apiAxios.put(`${BASE_API_AUTH}/me/update`, {
    full_name,
    avatar_url,
  });
  return res.data;
};