"use client";

import { useState } from "react";
import { Mail, User, Lock, AlertCircle } from "lucide-react";
import Card from "../components/card";
import { TypingText, TypingTextChar } from "../components/typingAnimation";
import { useAuth } from "../hooks/useAuth.hooks";
import { useRouter } from "next/navigation";
import Alert from "@/components/ui/alert";
import { useCallback } from "react";

export default function Register() {
  const { teacherRegister, loading, error, setError } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, email, password, confirmPassword } = formData;

    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await teacherRegister(email, password, fullName);
      setShowSuccessAlert(true);
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000); 

    } catch (err) {
      console.log("Registration failed:", err);
    }
  };

  const handleCloseSuccessAlert = useCallback(() => {
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 0);
  }, []);

  return (
    <>
      <Alert
        type="success"
        message="Akun berhasil dibuat! Silakan login."
        isOpen={showSuccessAlert}
        onClose={handleCloseSuccessAlert}
        duration={2000}
        position="top-center"
      />

      <div className="w-full h-full flex items-center justify-center px-4 md:px-8 lg:px-40">
        <Card className="w-full max-w-md lg:max-w-none flex flex-col gap-4 md:gap-6 py-4 md:py-6 px-4 md:px-7">
          <div className="flex flex-col items-center justify-center gap-1 mb-2 md:mb-4">
            <TypingText
              text="Create Teacher Account"
              className="font-semibold text-xs md:text-sm"
              speed={0.08}
            />
            <TypingTextChar
              text="Fill in your details to get started"
              className="text-xs md:text-sm text-gray-500"
              speed={0.04}
              delay={0.8}
              showCursor={false}
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 md:p-3 mb-2 md:mb-3 bg-red-100 border border-red-300 rounded-lg text-red-700">
              <AlertCircle className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-xs md:text-sm">{error}</span>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 md:gap-4 mt-2 md:mt-3 justify-center"
          >
            <div className="w-full flex flex-col gap-1 md:gap-2">
              <p className="text-xs md:text-sm text-black">Full Name</p>
              <div className="flex items-center border px-3 py-3 rounded-xl border-gray-400">
                <User className="w-4 h-4 md:w-5 md:h-5 text-gray-400 mr-2" />
                <input
                  name="fullName"
                  className="flex-1 outline-none text-sm md:text-base"
                  type="text"
                  placeholder="Enter Your Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="w-full flex flex-col gap-1 md:gap-2">
              <p className="text-xs md:text-sm text-black">Email Address</p>
              <div className="flex items-center border px-3 py-3 rounded-xl border-gray-400">
                <Mail className="w-4 h-4 md:w-5 md:h-5 text-gray-400 mr-2" />
                <input
                  name="email"
                  className="flex-1 outline-none text-sm md:text-base"
                  type="email"
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="w-full flex flex-col gap-1 md:gap-2">
              <p className="text-xs md:text-sm text-black">Password</p>
              <div className="flex items-center border px-3 py-3 rounded-xl border-gray-400">
                <Lock className="w-4 h-4 md:w-5 md:h-5 text-gray-400 mr-2" />
                <input
                  name="password"
                  className="flex-1 outline-none text-sm md:text-base"
                  type="password"
                  placeholder="Enter Your Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="w-full flex flex-col gap-1 md:gap-2">
              <p className="text-xs md:text-sm text-black">Confirm Password</p>
              <div className="flex items-center border px-3 py-3 rounded-xl border-gray-400">
                <Lock className="w-4 h-4 md:w-5 md:h-5 text-gray-400 mr-2" />
                <input
                  name="confirmPassword"
                  className="flex-1 outline-none text-sm md:text-base"
                  type="password"
                  placeholder="Confirm Your Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-center py-3 px-4 md:px-6 -mt-1 md:-mt-3">
              <p className="text-center text-black text-xs md:text-sm">
                By creating an account, you agree to our{" "}
                <span className="text-primary font-normal">Terms of Service </span>
                and{" "}
                <span className="text-primary font-normal">Privacy Policy</span>
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-primary rounded-xl text-white py-4 md:py-3 font-semibold text-sm md:text-base min-h-[52px] md:min-h-[48px] hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <div className="flex justify-center items-center mt-2 md:mt-3">
              <p className="text-xs md:text-sm font-bold text-black">
                Already have an account?
                <a className="text-primary cursor-pointer" href="./login">
                  {" "}
                  Sign in
                </a>
              </p>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}