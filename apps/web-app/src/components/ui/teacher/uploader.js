'use client'

import React, { useRef, useState, useEffect } from "react";
import { Upload, File, X } from "lucide-react";

export default function Uploader({
  title = "Upload PDF Material",
  accept = ".pdf",
  maxSizeMB = 10,
  onFileSelect,
  onUpload,
  disabled = false,
  loading = false,
}) {
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const fileType = file.type || '';
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const acceptedExtensions = accept.split(',').map(ext => ext.trim().replace('.', ''));
    
    if (!acceptedExtensions.includes(fileExtension)) {
      alert(`File type not supported. Please select ${accept} files only.`);
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`File exceeds ${maxSizeMB}MB!`);
      return;
    }

    setSelectedFile(file);
    onFileSelect?.(file);
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    if (!disabled && !loading) {
      setSelectedFile(null);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const handleUpload = (e) => {
    e.stopPropagation();
    if (selectedFile && !disabled && !loading) {
      onUpload?.(selectedFile);
    }
  };

  // Reset selected file when not loading (after upload success/error)
  useEffect(() => {
    if (!loading && selectedFile) {
      // Small delay to let user see the success/error state
      const timer = setTimeout(() => {
        setSelectedFile(null);
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div
      className={`border border-dashed rounded-xl px-6 py-14 flex flex-col items-center justify-center transition ${
        disabled || loading
          ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60' 
          : 'border-gray-300 cursor-pointer hover:bg-gray-50'
      }`}
      onClick={() => !disabled && !loading && !selectedFile && inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled || loading}
      />
      
      {!selectedFile ? (
        <div className="flex flex-col items-center gap-2">
          <Upload size={100} color="#9B9999" className="size-10 md:size-20" />
          <p className="font-normal text-sm md:text-xl">{title}</p>
          <p className="text-xs md:text-sm text-gray-500 text-center">
            Drag and drop your file here, or click to browse
          </p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (!disabled && !loading) inputRef.current?.click();
            }}
            disabled={disabled || loading}
            className="mt-3 px-8 text-sm py-2 bg-white text-black font-semibold border-2 border-gray-300 hover:bg-gray-100 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
          >
            Choose File
          </button>
          <p className="text-xs md:text-sm text-gray-400">
            {accept} files only, max {maxSizeMB}MB
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
            <File size={32} className="text-green-600" />
          </div>
          
          <div className="text-center w-full">
            <p className="font-semibold text-sm md:text-base text-gray-800 mb-1">
              {loading ? "Uploading..." : "Ready to Upload"}
            </p>
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 max-w-full">
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>
                {!loading && (
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    disabled={disabled || loading}
                    className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-gray-400"
                    title="Remove file"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleUpload}
              disabled={disabled || loading}
              className={`px-8 text-sm py-2 cursor-pointer font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed ${
                loading 
                  ? 'bg-green-400 text-white cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Uploading...
                </div>
              ) : (
                'Upload'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}