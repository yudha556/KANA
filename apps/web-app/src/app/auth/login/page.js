"use client";

import { useState, useRef, useCallback } from "react";
import Card from "@/app/auth/components/card";
import {
  TabView,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "./components/tabView";
import { TypingText, TypingTextChar } from "../components/typingAnimation";
import { Mail, Lock, Camera, Upload, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth.hooks";
import { useRouter } from "next/navigation";
import Alert from "@/components/ui/alert";

export default function AuthLogin() {
  const { teacherLogin, studentLogin, loading, error, setError } = useAuth();
  const router = useRouter();

  const [teacherData, setTeacherData] = useState({
    email: "",
    password: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleTeacherSubmit = async (e) => {
    e.preventDefault();
    if (!teacherData.email || !teacherData.password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      await teacherLogin(teacherData.email, teacherData.password);
      setShowSuccessAlert(true);
      setTimeout(() => router.push("/teacher/dashboard"), 1000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    try {
      await studentLogin(selectedFile);
      setShowSuccessAlert(true);
      setTimeout(() => router.push("/student/quizGeneration"), 1000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileSelect = (e, source) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);

      setError("");
    }
  };

  const handleTeacherChange = (e) => {
    setTeacherData({
      ...teacherData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  const handleCloseSuccessAlert = useCallback(() => {
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 3500);
  }, []);

  return (
    <>
      {/* Success Alert */}
      <Alert
        type="success"
        message="Login berhasil! Redirecting..."
        isOpen={showSuccessAlert}
        onClose={handleCloseSuccessAlert}
        duration={3000}
        position="top-right"
      />

      <div className="w-full h-full flex items-center justify-center px-4 md:px-8 lg:px-40">
        <Card className="w-full max-w-md lg:max-w-none flex flex-col gap-4 md:gap-6 py-8 md:py-6 px-4 md:px-7">
          <div className="flex flex-col items-center justify-center gap-1 mb-2 md:mb-4">
            <TypingText
              text="Let's Get Started!"
              className="font-semibold text-xs md:text-sm"
              speed={0.08}
            />
            <TypingTextChar
              text="Choose your login type"
              className="text-xs md:text-sm text-gray-500"
              speed={0.04}
              delay={0.8}
              showCursor={false}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 md:p-3 mb-2 md:mb-3 bg-red-100 border border-red-300 rounded-lg text-red-700">
              <AlertCircle className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-xs md:text-sm">{error}</span>
            </div>
          )}

          <TabView defaultIndex={1}>
            <TabList>
              <Tab index={0}>Teacher</Tab>
              <Tab index={1}>Student</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                {/* Teacher Login Form */}
                <form
                  onSubmit={handleTeacherSubmit}
                  className="flex flex-col gap-6 md:gap-6 mt-2 md:mt-3 justify-center"
                >
                  <div className="w-full flex flex-col gap-1 md:gap-2">
                    <p className="text-xs md:text-sm text-black">Email</p>
                    <div className="flex items-center border px-3 py-3 rounded-xl border-gray-400">
                      <Mail className="w-4 h-4 md:w-5 md:h-5 text-gray-400 mr-2" />
                      <input
                        name="email"
                        className="flex-1 outline-none text-sm md:text-base"
                        type="email"
                        placeholder="Teacher Email"
                        value={teacherData.email}
                        onChange={handleTeacherChange}
                        required
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
                        placeholder="Password"
                        value={teacherData.password}
                        onChange={handleTeacherChange}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary rounded-xl text-white py-3 font-semibold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                  >
                    {loading ? "Logging in..." : "Login Teacher"}
                  </button>

                  <div className="flex justify-center items-center -mt-2 md:-mt-3">
                    <p className="text-xs md:text-sm font-bold text-black">
                      Don&apos;t have an account?
                      <Link
                        href="/auth/register"
                        className="text-primary hover:underline ml-1"
                      >
                        Create new account
                      </Link>
                    </p>
                  </div>
                </form>
              </TabPanel>

              <TabPanel>
                {/* Student Login Form */}
                <form
                  onSubmit={handleStudentSubmit}
                  className="flex flex-col gap-4 md:gap-6 mt-2 md:mt-3 justify-center"
                >
                  <div className="flex flex-col items-center gap-1">
                    {/* Preview Image or Camera Icon */}
                    {previewUrl ? (
                      <div className="w-32 h-32 mb-2 border-4 border-primary rounded-full overflow-hidden">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <label
                        htmlFor="camera-upload"
                        className="flex flex-col items-center justify-center w-32 h-32 mb-2 border-4 border-primary bg-[#BFDBFE] rounded-full cursor-pointer hover:bg-blue-300 transition"
                      >
                        <Camera
                          size={40}
                          className="text-white md:w-15 md:h-15"
                        />
                      </label>
                    )}

                    <input
                      ref={cameraInputRef}
                      id="camera-upload"
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                      onChange={(e) => handleFileSelect(e, "camera")}
                    />

                    <p className="text-xs md:text-sm font-semibold text-black">
                      Face Recognition Login
                    </p>
                    <p className="text-xs md:text-sm text-center text-gray-500 px-2">
                      {selectedFile
                        ? "Photo selected! Click login to continue."
                        : "Look at the camera and smile! We'll recognize you automatically."}
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !selectedFile}
                    className="w-full bg-primary rounded-xl text-white py-4 md:py-3 font-semibold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base min-h-[52px] md:min-h-[48px]"
                  >
                    {loading ? "Recognizing..." : "Login Student"}
                  </button>

                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer border-2 border-gray-400 flex items-center justify-center p-3 md:p-2 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition -mt-1 md:-mt-2 text-sm md:text-base min-h-[50px] md:min-h-[44px]"
                  >
                    <Upload className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                    Upload Photo
                  </label>
                  <input
                    ref={fileInputRef}
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileSelect(e, "upload")}
                  />

                  {selectedFile && (
                    <div className="text-center -mt-2 md:-mt-3">
                      <p className="text-xs md:text-sm text-green-600">
                        ✓ Photo selected: {selectedFile.name}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFile(null);
                          setPreviewUrl("");
                          if (fileInputRef.current)
                            fileInputRef.current.value = "";
                          if (cameraInputRef.current)
                            cameraInputRef.current.value = "";
                        }}
                        className="text-xs text-red-500 hover:underline mt-1"
                      >
                        Remove photo
                      </button>
                    </div>
                  )}
                </form>
              </TabPanel>
            </TabPanels>
          </TabView>
        </Card>
      </div>
    </>
  );
}