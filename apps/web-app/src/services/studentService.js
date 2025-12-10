import apiAxios from "@/lib/apiAxios";

const BASE_API_STUDENT = "/student";

export const studentLogin = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await apiAxios.post(`${BASE_API_STUDENT}/login`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (!res.data?.data) throw new Error("No data in response");
    return res.data.data;
  } catch (err) {
    console.error("Student login failed:", err);
    throw err; 
  }
};


export const createStudent = async (name, file) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("file", file);

  const res = await apiAxios.post(`${BASE_API_STUDENT}/create`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const getAllStudents = async () => {
  const res = await apiAxios.get(`${BASE_API_STUDENT}/`);
  return res.data;
};

export const getStudentById = async (studentId) => {
  const res = await apiAxios.get(`${BASE_API_STUDENT}/${studentId}`);
  return res.data;
};

export const deleteStudent = async (studentId) => {
  const res = await apiAxios.delete(`${BASE_API_STUDENT}/${studentId}`);
  return res.data;
};