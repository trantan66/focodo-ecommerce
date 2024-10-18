import axiosInstance from "./Customize-Axios";

export const fetchCategoriesFromAPI = async (page, size) => {
  try {
    const response = await axiosInstance.get(
      `categories?page=${page - 1}&size=${size}`
    );
    return {
      data: response.result.data,
      total: response.result.pagination.total_records,
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
