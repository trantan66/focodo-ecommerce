import axios from "axios";

export const fetchReviewsFromAPI = async (page, size) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/reviews?page=${page - 1}&size=${size}`
    );
    return {
      data: response.data.result.data,
      total: response.data.result.pagination.total_records,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
