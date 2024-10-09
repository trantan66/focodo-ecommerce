import axios from "axios";

export const fetchUsersFromAPI = async (page, size) => {
  const token = localStorage.getItem("access_token");

  try {
    const response = await axios.get(`http://localhost:8080/api/v1/users`, {
      params: {
        page: page - 1,
        size: size,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      data: response.data.result.data,
      total: response.data.result.pagination.total_records,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
