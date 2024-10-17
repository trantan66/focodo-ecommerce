import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../CustomCss/Slider.css";
import {
  fetchCategoriesForProductFromAPI,
  fetchProductByIdFromAPI,
  updateProductToAPI,
} from "../../../Services/ProductService";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function ProductDetail() {
  const { productId } = useParams();

  const [name, setProductName] = useState("");
  const [quantity, setProductQuantity] = useState("");
  const [package_quantity, setProductPackageQuantity] = useState("");
  const [sub_description, setSubDescription] = useState("");
  const [main_description, setMainDescription] = useState("");
  const [original_price, setOriginalPrice] = useState("");
  const [sell_price, setSalePrice] = useState("");
  const discount = ((original_price - sell_price) / original_price).toFixed(2);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [removeSelectedCategories, setRemoveSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [currentImages, setCurrentImages] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await fetchCategoriesForProductFromAPI();
        const filteredCategories = data.filter(
          (category) => category.id !== 1 && category.id !== 2
        );
        setCategories(filteredCategories);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const { data } = await fetchProductByIdFromAPI(productId);
        const filteredCategories = data.categories.filter(
          (category) => category.id !== 1 && category.id !== 2
        );
        setSelectedCategories(filteredCategories);

        setCurrentImages(data.images);

        setProductName(data.name);
        setProductQuantity(data.quantity);
        setProductPackageQuantity(data.package_quantity);
        setOriginalPrice(data.original_price);
        setSalePrice(data.sell_price);

        setSubDescription(data.sub_description);
        setMainDescription(data.main_description);
      } catch (error) {
        console.error("Error fetching product by id:", error);
      }
    };
    fetchProductById();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryIds = selectedCategories.map((category) => category.id);
    categoryIds.unshift(1);

    const categoryRemovedIds = removeSelectedCategories.map((category) =>  category.id);

    const product = {
      name,
      original_price: parseInt(original_price, 10),
      sell_price: parseInt(sell_price, 10),
      sub_description,
      main_description,
      discount: parseFloat(discount),
      package_quantity: parseInt(package_quantity, 10),
      quantity: parseInt(quantity, 10),
      categories: categoryIds,
    };
    console.log(product);
    console.log(images);
    console.log(currentImages);
    console.log(categoryRemovedIds);

    try {
      const response = await updateProductToAPI(productId, product, images, currentImages, categoryRemovedIds);
      console.log(response.code)
    } catch (error) {
      console.error("Error adding the product:", error);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previewUrls);
  };

  const handleRemoveImage = (indexToRemove) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = parseInt(e.target.value);
    const selectedCategory = categories.find(
      (category) => category.id === selectedCategoryId
    );

    if (
      selectedCategory &&
      !selectedCategories.some((cat) => cat.id === selectedCategoryId)
    ) {
      setSelectedCategories([...selectedCategories, selectedCategory]);
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setSelectedCategories(
      selectedCategories.filter(
        (category) => category.id !== categoryToRemove.id
      )
    );
    setRemoveSelectedCategories((prevCategories) => [
      ...prevCategories,
      categoryToRemove,
    ]);
  };

  const handleRemoveCurrentImages = (imageToRemove) => {
    setCurrentImages((prevImages) =>
      prevImages.filter((image) => image !== imageToRemove)
    );
  };

  return (
    <div className="px-4 flex flex-col flex-1">
      <div className="rounded-md flex flex-row justify-between flex-1">
        <span className="text-white text-3xl mb-4">Sản phẩm #{productId}</span>
        <button className="text-red-500  bg-[#4D2F3A] px-6 mb-3 rounded-md hover:bg-red-800">
          Xóa sản phẩm
        </button>
      </div>

      <div className="rounded-md flex flex-1">
        <div className="flex-[1] bg-[#282941] mr-2 mb-4 max-h-auto overflow-auto">
          <div className="grid grid-cols-2 gap-4 p-3">
            {currentImages.map((item) => (
              <div className="relative" key={item}>
                <img
                  src={item}
                  alt="Product"
                  className="w-full rounded-sm object-cover"
                />
                <button
                  onClick={() => handleRemoveCurrentImages(item)}
                  className="absolute top-0 right-1 text-xl text-red-800 p-1"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-[2] bg-[#282941] px-4 py-3 mb-4">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row gap-4 w-full p-1">
              {/* Product Name */}
              <div className="flex items-center flex-col flex-[2]">
                <span className=" text-white mb-1 self-start">
                  Tên sản phẩm
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setProductName(e.target.value)}
                  className="text-sm focus:outline-none border border-gray-300 w-full h-10 px-4 rounded-sm bg-[#282941] text-white mr-2 "
                  placeholder="Tên sản phẩm"
                  required
                />
              </div>
              {/* Quantity */}
              <div className="flex items-center flex-col flex-[1]">
                <span className=" text-white mb-1 self-start">Số lượng</span>
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => setProductQuantity(e.target.value)}
                  className="text-sm focus:outline-none border border-gray-300 w-full h-10 px-4 pr-4 rounded-sm bg-[#282941] text-white "
                  placeholder="Số lượng"
                />
              </div>
              {/* Quantity per package */}
              <div className="flex items-center flex-col flex-[1]">
                <span className=" text-white mb-1 self-start">
                  Số lượng / gói
                </span>
                <input
                  type="text"
                  value={package_quantity}
                  onChange={(e) => setProductPackageQuantity(e.target.value)}
                  className="text-sm focus:outline-none border border-gray-300 w-full h-10 px-4 pr-4 rounded-sm bg-[#282941] text-white "
                  placeholder="Số lượng / gói"
                />
              </div>
            </div>

            {/* Category selection */}
            <div className="flex items-center flex-col ">
              <span className="text-white mb-1 self-start">Danh mục</span>
              <select
                onChange={handleCategoryChange}
                className="text-sm focus:outline-none border border-gray-300 w-full h-10 px-4 pr-4 rounded-sm bg-[#282941] text-white overflow-y-auto"
              >
                <option value="">Chọn danh mục</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              {/* Display selected categories */}
              {selectedCategories.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2 self-start">
                  {selectedCategories.map((category) => (
                    <div
                      key={category.id}
                      className="border bg-[#B1C1C0] text-gray-800 p-2 rounded-md"
                    >
                      <span>{category.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCategory(category)}
                        className="ml-2 text-red-400"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pricing fields */}
            <div className="flex flex-row gap-4 w-full p-1">
              {/* Original Price */}
              <div className="flex items-center flex-col flex-1">
                <span className=" text-white mb-1 self-start">
                  Giá sản phẩm (VNĐ)
                </span>
                <input
                  type="text"
                  value={original_price}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="text-sm focus:outline-none border border-gray-300 w-full h-10 px-4 rounded-sm bg-[#282941] text-white mr-2 "
                  placeholder="Giá gốc"
                  required
                />
              </div>
              {/* Sale Price */}
              <div className="flex items-center flex-col flex-1">
                <span className=" text-white mb-1 self-start ">
                  Giá bán (VNĐ)
                </span>
                <input
                  type="text"
                  value={sell_price}
                  onChange={(e) => setSalePrice(e.target.value)}
                  className="text-sm focus:outline-none border border-gray-300 w-full h-10 px-4 pr-4 rounded-sm bg-[#282941] text-white "
                  placeholder="Giá bán"
                />
              </div>
            </div>

            {/* Descriptions and CKEditor */}
            <div className="mb-4">
              <span className="block text-white mb-2">Mô tả ngắn gọn</span>
              <textarea
                value={sub_description}
                onChange={(e) => setSubDescription(e.target.value)}
                className="w-full p-3 border rounded-sm bg-[#282941] text-white focus:outline-none"
                placeholder="Nhập mô tả sản phẩm"
                rows="4"
                required
              />
            </div>
            <div className="mb-4">
              <span className="block text-white mb-2">Mô tả chi tiết</span>
              <CKEditor
                editor={ClassicEditor}
                data={main_description || ""}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setMainDescription(data);
                }}
                className="w-full p-3 border rounded-sm bg-[#282941] text-white focus:outline-none"
              />
            </div>

            {/* Image upload */}
            <div className="mb-4">
              <span className="block text-white mb-2">Hình ảnh sản phẩm</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="w-full p-3 border rounded-sm bg-[#282941] text-white focus:outline-none"
              />
            </div>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="mb-4 grid grid-cols-3 gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Xem trước hình ảnh ${index + 1}`}
                      className="w-64 h-64 object-cover rounded-md"
                    />

                    <button
                      type="button"
                      className="absolute top-0 right-0 text-red-500 pr-1"
                      onClick={() => handleRemoveImage(index)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 p-3 rounded-md text-white hover:bg-blue-500"
            >
              Cập nhật
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
