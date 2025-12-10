"use client";
import { useState, useEffect, useCallback } from "react";
import { getAllMaterials, getAllDecks } from "@/services/deckService";
import { getAllStudents } from "@/services/studentService";

export const useDashboardData = () => {
  const [dashboardData, setDashboardData] = useState({
    totalMaterials: 0,
    activeStudents: 0,
    quizDecks: 0,
    completionRate: 0,
    materials: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [materialsRes, studentsRes, decksRes] = await Promise.allSettled([
        getAllMaterials(),
        getAllStudents(),
        getAllDecks(),
      ]);

      const data = {
        totalMaterials: 0,
        activeStudents: 0,
        quizDecks: 0,
        completionRate: 0,
        materials: [],
      };

      if (materialsRes.status === "fulfilled") {
        console.log("🔎 getAllMaterials response:", materialsRes.value);

        const raw = materialsRes.value;
        const mats = Array.isArray(raw?.data) ? raw.data : [];

        data.totalMaterials = mats.length;
        data.materials = mats;
      } else {
        console.warn("Failed to fetch materials:", materialsRes.reason);
      }

      if (studentsRes.status === "fulfilled") {
        const students = studentsRes.value?.data ?? [];
        data.activeStudents = Array.isArray(students) ? students.length : 0;
      }

      if (decksRes.status === "fulfilled") {
        const decks = decksRes.value?.data ?? [];
        data.quizDecks = Array.isArray(decks) ? decks.length : 0;
      }

      setDashboardData(data);
    } catch (err) {
      setError(err?.message || "Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  useEffect(() => {
    console.log("🔥 Dashboard data:", dashboardData);
    console.log("🔥 Error state:", error);
  }, [dashboardData, error]);

  return { data: dashboardData, loading, error, refetch: fetchDashboardData };
};