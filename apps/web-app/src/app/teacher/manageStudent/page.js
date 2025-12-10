"use client";

import Card from "@/components/ui/teacher/card";
import Button from "@/components/ui/button";
import { ArrowLeft, Check, Plus, Users, RefreshCw, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import StudentList from "./components/studentList";
import AddStudentModal from "./components/addStudentModal";
import { useState } from "react";
import { useStudents } from "./hook/useStudent.hooks";

export default function ManageStudent() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  
  const {
    students,
    stats,
    loading,
    addingStudent,
    error,
    addStudent,
    removeStudent,
    clearError,
    refetch
  } = useStudents();

  const handleOpenModal = () => {
    setModalOpen(true);
    clearError();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAddStudent = async (studentData) => {
    try {
      await addStudent(studentData.name, studentData.profileImage);
      
      setModalOpen(false);
      console.log("Student added successfully");
      
    } catch (err) {
      console.error("Failed to add student:", err);
    }
  };

  return (
    <div className="w-full flex flex-col md:items-center gap-10">
      {/* Header Section */}
      <div className="w-full flex gap-5 flex-col md:flex-row justify-between items-center">
        <div className="flex flex-row gap-6 justify-between items-center">
          <Button
            size="sm md:md"
            variant="secondary"
            onClick={() => router.push("/teacher/dashboard")}
            className="px-4 h-14 flex flex-row items-center gap-3"
          >
            <ArrowLeft size={25} />
            Back To Dashboard
          </Button>
          <div className="flex flex-col items-start">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
              Manage Student
            </h1>
            <p className="text-sm md:text-lg text-[#4A5565] font-normal">
              Add, remove, and view student progress
            </p>
          </div>
        </div>
        
        <Button 
          size="md" 
          variant="primary" 
          className="w-full md:w-70" 
          onClick={handleOpenModal}
          disabled={addingStudent}
        >
          <div className="flex flex-row gap-4 lg:w-full items-center justify-center">
            <Plus size={25} />
            {addingStudent ? 'Adding...' : 'Add Student'}
          </div>
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="w-full px-3">
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <AlertCircle size={20} />
            <span className="flex-1 text-sm">{error}</span>
            <button
              onClick={refetch}
              className="flex items-center gap-2 px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200"
            >
              <RefreshCw size={14} />
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 w-full px-3">
        {/* Total Students Card */}
        <div className="bg-white border-l-4 border-primary rounded-2xl shadow-md px-6 w-full h-30 md:h-35 flex flex-row items-center gap-6">
          <Users size={60} color="#8ACEE5" />
          <div className="flex flex-col gap-2 items-start">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-10 bg-gray-300 rounded w-16 mb-2"></div>
                <div className="h-5 bg-gray-300 rounded w-24"></div>
              </div>
            ) : (
              <>
                <p className="text-4xl font-bold">{stats.totalStudents}</p>
                <p className="text-lg text-[#4B5563]">Total Student</p>
              </>
            )}
          </div>
        </div>

        {/* High Performers Card */}
        <div className="bg-white border-l-4 border-green-500 rounded-2xl shadow-md px-6 w-full h-30 md:h-35 flex flex-row items-center gap-6">
          <div className="w-15 h-15 bg-green-200 rounded-xl flex items-center justify-center">
            <Check size={50} color="green" />
          </div>
          <div className="flex flex-col gap-2 items-start">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-10 bg-gray-300 rounded w-16 mb-2"></div>
                <div className="h-5 bg-gray-300 rounded w-24"></div>
              </div>
            ) : (
              <>
                <p className="text-4xl font-bold">{stats.highPerformers}</p>
                <p className="text-lg text-[#4B5563]">High Performers</p>
              </>
            )}
          </div>
        </div>
        
        {/* Need Attention Card */}
        <div className="bg-white border-l-4 border-yellow-400 rounded-2xl shadow-md px-6 w-full h-30 md:h-35 flex flex-row items-center gap-6">
          <div className="flex items-center justify-center w-15 h-15 bg-yellow-100 rounded-xl">
            <h1 className="text-5xl text-yellow-500">!</h1>
          </div>
          <div className="flex flex-col gap-2 items-start">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-10 bg-gray-300 rounded w-16 mb-2"></div>
                <div className="h-5 bg-gray-300 rounded w-24"></div>
              </div>
            ) : (
              <>
                <p className="text-4xl font-bold">{stats.needAttention}</p>
                <p className="text-lg text-[#4B5563]">Need Attention</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Student List */}
      <div className="px-3 w-full">
        <Card className="px-2 flex flex-col py-3 max-h-[500px] overflow-y-auto pb-20">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-600">Loading students...</span>
              </div>
            </div>
          ) : (
            <StudentList 
              newStudents={students} 
              onRemoveStudent={removeStudent}
            />
          )}
        </Card>
      </div>

      {/* Add Student Modal */}
      <AddStudentModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddStudent}
        isLoading={addingStudent}
        error={error}
      />
    </div>
  );
}