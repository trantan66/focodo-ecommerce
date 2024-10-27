import axiosInstance from "./Customize-Axios";
import { getHeader } from "./GetHeader";

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
export const DeleteReview = async (reviewId) => {
  try {
    const response = await axiosInstance.delete(
      `reviews/delete/${reviewId}`,
      {
        headers: {
          ...getHeader(),
        },
      }
      
    )
    return response.data;
  }catch (error) {
        if (error.response) {
            console.error('Error response from server:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        throw error;
    }
};