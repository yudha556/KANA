"use client";
import { useState } from "react";
import Cookies from "js-cookie";
import { register, login } from "@/services/authService";
import { studentLogin as studentLoginService } from "@/services/studentService";
import { useRouter } from "next/navigation";
import { getProfile } from "@/services/authService";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const teacherRegister = async (email, password, full_name) => {
    setLoading(true);
    setError("");
    try {
      const res = await register(email, password, full_name);
      return res;
    } catch (err) {
      setError(
        err?.response?.data?.message || "Gagal membuat akun, coba lagi."
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const teacherLogin = async (email, password) => {
    setLoading(true);
    setError("");
    try {
      const data = await login(email, password);

      Cookies.set("token", data.token, { path: "/" });
      Cookies.set("role", "teacher", { path: "/" });

      const profile = await getProfile();

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: profile.id,
          full_name: profile.full_name,
          role: "teacher",
        })
      );
      localStorage.setItem("access_token", data.token);

      return { ...data, user: profile };
    } catch (err) {
      setError(err?.response?.data?.message || "Email atau password salah.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const studentLogin = async (file) => {
    setLoading(true);
    setError("");
    try {
      const student = await studentLoginService(file);

      Cookies.set("token", student.access_token, { path: "/" });
      Cookies.set("role", "student", { path: "/" });

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: student.id,
          full_name: student.full_name,
          role: student.role,
        })
      );
      localStorage.setItem("access_token", student.access_token);
      return student;
    } catch (err) {
      setError(err?.response?.data?.message || "Login student gagal.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("token", { path: "/" });
    Cookies.remove("role", { path: "/" });
    localStorage.removeItem("user");
    router.push("/auth/login");
  };

  return {
    loading,
    error,
    setError,
    teacherRegister,
    teacherLogin,
    studentLogin,
    logout,
  };
};