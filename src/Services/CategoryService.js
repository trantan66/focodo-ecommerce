import axios from "axios";

export const fetchCategoriesFromAPI = async (page, size) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/categories?page=${page - 1}&size=${size}`
    );
    return {
      data: response.data.result.data,
      total: response.data.result.pagination.total_records,
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};