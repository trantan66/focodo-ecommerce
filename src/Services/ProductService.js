import axiosInstance from "./Customize-Axios";
export const getHeader = () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("No access token found");
  }
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const fetchProductsFromAPI = async (page, size) => {
  try {
    const response = await axiosInstance.get(
      `products?page=${page - 1}&size=${size}`
    );
    return {
      data: response.result.data,
      total: response.result.pagination.total_records,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export const fetchCategoriesForProductFromAPI = async () => {
  try {
    const response = await axiosInstance.get(`categories/all`);
    return {
      data: response.result,
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
export const addProductToAPI = async (product, images) => {
  try {
    const formData = new FormData();

    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );
    images.forEach((element) => {
      formData.append("images", element);
    });
    const response = await axiosInstance.post("products/create", formData, {
      headers: {
        ...getHeader(),
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response from server:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    throw error;
  }
};
export const fetchProductByIdFromAPI = async (id) => {
  try {
    const response = await axiosInstance.get(`products/getProductById/${id}`);
    return {
      data: response.result,
    };
  } catch (error) {
    console.error("Error fetching product by id:", error);
    throw error;
  }
};
