"use client";

// hooks/useStudents.js
import { useState, useEffect } from 'react';
import { getAllStudents, createStudent, deleteStudent } from '@/services/studentService';

export const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addingStudent, setAddingStudent] = useState(false);

  // Stats yang dihitung dari data students
  const [stats, setStats] = useState({
    totalStudents: 0,
    highPerformers: 0,
    needAttention: 0
  });

  // Fetch semua students
  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getAllStudents();
      const studentsData = response?.data || response || [];
      
      setStudents(Array.isArray(studentsData) ? studentsData : []);
      
    } catch (err) {
      setError(err.message || 'Failed to fetch students');
      console.error('Failed to fetch students:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add student baru
  const addStudent = async (name, imageFile) => {
    try {
      setAddingStudent(true);
      setError(null);

      console.log('Payload:', { name, imageFile });


      // Validasi input
      if (!name || !name.trim()) {
        throw new Error('Student name is required');
      }

      if (!imageFile) {
        throw new Error('Student photo is required');
      }

      // Call service untuk create student
      const response = await createStudent(name.trim(), imageFile);
      
      // Jika berhasil, refresh data students
      await fetchStudents();
      
      return response;
      
    } catch (err) {
      setError(err.message || 'Failed to add student');
      throw err;
    } finally {
      setAddingStudent(false);
    }
  };

  // Remove student
  const removeStudent = async (studentId) => {
    try {
      setError(null);
      
      await deleteStudent(studentId);
      
      // Update local state untuk immediate feedback
      setStudents(prev => prev.filter(student => student.id !== studentId));
      
    } catch (err) {
      setError(err.message || 'Failed to remove student');
      throw err;
    }
  };

  // Calculate stats berdasarkan data students
  const calculateStats = () => {
    const totalStudents = students.length;
    
    // Contoh perhitungan - bisa disesuaikan dengan logika bisnis
    // Asumsi students punya field 'performance' atau 'averageScore'
    let highPerformers = 0;
    let needAttention = 0;
    
    students.forEach(student => {
      // Contoh logic - sesuaikan dengan struktur data actual
      if (student.averageScore >= 80) {
        highPerformers++;
      } else if (student.averageScore < 60) {
        needAttention++;
      }
    });

    // Jika tidak ada field performance, gunakan default values
    if (!students.some(s => s.averageScore !== undefined)) {
      // Default calculation atau random untuk demo
      highPerformers = Math.floor(totalStudents * 0.3); // 30% high performers
      needAttention = Math.floor(totalStudents * 0.2); // 20% need attention
    }

    setStats({
      totalStudents,
      highPerformers,
      needAttention
    });
  };

  // Update stats setiap kali students data berubah
  useEffect(() => {
    calculateStats();
  }, [students]);

  // Initial fetch saat hook pertama kali digunakan
  useEffect(() => {
    fetchStudents();
  }, []);

  // Clear error function
  const clearError = () => {
    setError(null);
  };

  return {
    students,
    stats,
    loading,
    addingStudent,
    error,
    fetchStudents,
    addStudent,
    removeStudent,
    clearError,
    refetch: fetchStudents
  };
};