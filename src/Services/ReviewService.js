import axiosInstance from "./Customize-Axios";

export const fetchReviewsFromAPI = async (page, size) => {
  try {
    const response = await axiosInstance.get(
      `reviews?page=${page - 1}&size=${size}`
    );
    return {
      data: response.result.data,
      total: response.result.pagination.total_records,
    };
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};
