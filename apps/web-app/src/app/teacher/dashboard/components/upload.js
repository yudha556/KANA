"use client";

import { useState } from "react";
import Card from "@/components/ui/teacher/card";
import Button from "@/components/ui/button";
import Uploader from "@/components/ui/teacher/uploader";
import { BookOpen, Plus, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { uploadMaterial } from "@/services/deckService";
import Alert from "@/components/ui/alert";

export default function Upload() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setUploadStatus(null); 
  };

  const handleUpload = async (file) => {
    try {
      setLoading(true);
      setUploadStatus(null);
      
      const title = file.name.replace(/\.[^/.]+$/, "");
      await uploadMaterial(title, file);
      
      setUploadStatus('success');
      Alert.success(`${file.name} berhasil diupload!`);
      
      setTimeout(() => {
        setSelectedFile(null);
      }, 1500);
      
    } catch (err) {
      console.error(err);
      setUploadStatus('error');
      Alert.error("Upload gagal. Silakan coba lagi");
    } finally {
      setLoading(false);
    }
  };

  const getUploaderTitle = () => {
    if (loading) return "Uploading...";
    if (uploadStatus === 'success') return "Upload Successful! Choose another file";
    if (uploadStatus === 'error') return "Upload Failed. Try again";
    return "Upload PDF Material";
  };

  const getBorderStyle = () => {
    if (loading) return 'border-blue-300 bg-blue-50';
    if (uploadStatus === 'success') return 'border-green-300 bg-green-50';
    if (uploadStatus === 'error') return 'border-red-300 bg-red-50';
    if (selectedFile) return 'border-blue-300 ';
    return 'border-gray-300';
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-8 w-full">
      <div className="w-full h-full">
        <Card className="w-full flex flex-col gap-6 py-6 px-8">
          <div className="flex gap-2 items-center justify-start">
            <Plus size={30} className="text-primary" />
            <p className="text-lg md:text-xl lg:text-2xl">Upload New Material</p>
          </div>
          <div className="md:px-5 lg:px-10 pb-8">
            <div className={`border-2 rounded-2xl px-10 py-6 transition-all duration-300 ${getBorderStyle()}`}>
              <Uploader
                title={getUploaderTitle()}
                onFileSelect={handleFileSelect}
                onUpload={handleUpload}
                loading={loading}
                disabled={false}
              />
            </div>
            
            {/* Status indicator */}
            {selectedFile && !loading && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  File ready to upload: <span className="font-medium text-gray-800">{selectedFile.name}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Click &apos;Upload&apos; button to start uploading to database
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>

      <div className="flex flex-col gap-5 w-full lg:w-1/2">
        <Button
          variant="primary"
          size="lg"
          className="w-full flex flex-col items-center justify-center"
          onClick={() => router.push("/teacher/manageStudent")}
          disabled={loading}
        >
          <Users size={30} />
          <p className="text-xl font-medium">Manage Students</p>
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className="flex w-full flex-col items-center justify-center"
          onClick={() => router.push("/teacher/deck")}
          disabled={loading}
        >
          <BookOpen size={30} />
          <p className="text-xl font-medium">View All Deck</p>
        </Button>
      </div>
    </div>
  );
}