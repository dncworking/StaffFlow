import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const addData = async (employee) => {
  try {
    const response = await axios.post(API_URL, employee);
    return response.data;
  } catch (error) {
    console.error("Klaida pridedant darbuotoją:", error.message);
    throw error;
  }
};
