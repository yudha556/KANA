import apiAxios from "@/lib/apiAxios";

const BASE_QUIZ = "/quizzes";
const BASE_QUESTION = "/questions";

// Quiz endpoints
export const createQuiz = async () => {
  const res = await apiAxios.post(BASE_QUIZ);
  return res.data;
};

export const getAllQuizzes = async () => {
  const res = await apiAxios.get(BASE_QUIZ);
  return res.data;
};

export const getQuizById = async (quizId) => {
  const res = await apiAxios.get(`${BASE_QUIZ}/${quizId}`);
  return res.data;
};

export const getStudentQuizHistory = async (studentId) => {
  const res = await apiAxios.get(`${BASE_QUIZ}/student/${studentId}`);
  return res.data;
};

export const finishQuiz = async (quizId, score) => {
  const res = await apiAxios.post(`${BASE_QUIZ}/${quizId}/finish`, { score });
  return res.data;
};

export const getQuizScoreAndFinish = async (quizId) => {
  const res = await apiAxios.get(`${BASE_QUIZ}/${quizId}/score`);
  return res.data;
};

// Question endpoints
export const generateQuestions = async (quizId) => {
  const res = await apiAxios.post(`${BASE_QUESTION}/generate?quiz_id=${quizId}`);
  return res.data;
};

export const getQuizQuestions = async (quizId) => {
  const res = await apiAxios.get(`${BASE_QUESTION}/${quizId}`);
  return res.data;
};

export const answerQuestion = async (question_id, answer, time_answered) => {
  const res = await apiAxios.post(`${BASE_QUESTION}/answer`, {
    question_id,
    answer,
    time_answered,
  });
  return res.data;
};