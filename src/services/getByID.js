import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getOneEmployee = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Klaida gaunant darbuotoja:", error);
    throw error;
  }
};
