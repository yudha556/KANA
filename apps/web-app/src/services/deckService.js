import apiAxios from "@/lib/apiAxios";

const BASE_MATERIAL = "/materials/";
const BASE_DECK = "/decks/";

// Material endpoints
export const uploadMaterial = async (title, file) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("file", file);

  const res = await apiAxios.post(`${BASE_MATERIAL}upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const getAllMaterials = async () => {
  const res = await apiAxios.get(`${BASE_MATERIAL}`);
  console.log("URL dipanggil:", BASE_MATERIAL);
  return res.data;
};

export const getMaterialById = async (materialId) => {
  const res = await apiAxios.get(`${BASE_MATERIAL}${materialId}`);
  return res.data;
};

export const deleteMaterial = async (materialId) => {
  const res = await apiAxios.delete(`${BASE_MATERIAL}${materialId}`);
  return res.data;
};

// Deck endpoints
export const splitMaterial = async (materialId) => {
  const res = await apiAxios.post(`${BASE_DECK}split/${materialId}`);
  return res.data;
};

export const getAllDecks = async () => {
  const res = await apiAxios.get(BASE_DECK);
  return res.data ?? [];
};

export const getDeckById = async (deckId) => {
  const res = await apiAxios.get(`${BASE_DECK}${deckId}`);
  return res.data;
};

export const getDeckProgress = async (deckId) => {
  const res = await apiAxios.get(`${BASE_DECK}${deckId}/progress`);
  return res.data;
};