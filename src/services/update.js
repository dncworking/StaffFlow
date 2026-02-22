import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const updateEmployee = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Klaida atnaujinant:", error.message);
    throw error;
  }
};
