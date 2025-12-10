"use client";

import React, { useState, useRef } from "react";
import { X, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Alert from "@/components/ui/alert"; 

const AddStudentModal = ({ isOpen, onClose, onSubmit, isLoading = false, error = null }) => {
  const [studentName, setStudentName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [alert, setAlert] = useState({ 
    isOpen: false, 
    type: "info", 
    message: "" 
  });
  const fileInputRef = useRef(null);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: -20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: 20 },
  };

  const showAlert = (type, message) => {
    setAlert({ isOpen: true, type, message });
  };

  const closeAlert = () => {
    setAlert({ ...alert, isOpen: false });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showAlert("error", "Please select a valid image file");
        return;
      }

      const maxSizeInBytes = 5 * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        showAlert("error", "Image size must be less than 5MB");
        return;
      }

      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  const handleSubmit = async () => {
    if (!studentName.trim()) {
      showAlert("error", "Please enter student name");
      return;
    }

    if (!profileImage) {
      showAlert("error", "Please upload student photo");
      return;
    }
    
    try {
      await onSubmit({
        name: studentName,
        profileImage,
        imagePreview,
      });
      
      showAlert("success", "Student added successfully!");
      setTimeout(() => {
        resetForm();
        closeAlert();
      }, 3000);
      
    } catch (err) {
      showAlert("error", error || "Failed to add student");
    }
  };

  const resetForm = () => {
    setStudentName("");
    setProfileImage(null);
    setImagePreview(null);
  };

  const handleCancel = () => {
    resetForm();
    closeAlert();
    onClose();
  };

  React.useEffect(() => {
    if (error && isOpen) {
      showAlert("error", error);
    }
  }, [error, isOpen]);

  React.useEffect(() => {
    const handleEscape = (e) => e.key === "Escape" && isOpen && handleCancel();
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Alert Component */}
      <Alert
        type={alert.type}
        message={alert.message}
        isOpen={alert.isOpen}
        onClose={closeAlert}
        position="top-right"
        duration={4000}
        showProgressBar={true}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* modal box */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 pb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">
                    Add New Student
                  </h2>
                  <p className="text-sm text-gray-500">
                    Enter the students information to add them
                  </p>
                </div>
                <button
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                >
                  <X size={24} className="text-gray-400 hover:text-gray-600" />
                </button>
              </div>

              {/* Body */}
              <div className="px-6 pb-6">
                {/* Upload */}
                <div
                  className="flex flex-col items-center mb-8 cursor-pointer"
                  onClick={!isLoading ? triggerFileInput : undefined}
                >
                  <div className="relative w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Student preview"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <Camera
                        size={32}
                        className="text-gray-400 hover:text-gray-600"
                      />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    Upload student Photo
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isLoading}
                  />
                </div>

                {/* Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Student name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder-gray-400 disabled:opacity-50"
                    onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSubmit()}
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                  <button
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="px-6 py-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading || !studentName.trim() || !profileImage}
                    className="px-6 py-2.5 bg-[#4EC0E6] hover:bg-cyan-500 text-white rounded-lg flex items-center gap-2 disabled:opacity-50 transition-colors"
                    type="button"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Adding...
                      </>
                    ) : (
                      "Add Student"
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AddStudentModal;