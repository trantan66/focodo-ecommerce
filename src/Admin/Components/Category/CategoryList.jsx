import React, { useCallback, useEffect, useMemo, useState } from "react";
import CategoryTableHeader from "./CategoryTableHeader";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { fetchCategoriesForProductFromAPI } from "../../../Services/ProductService";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriesPerPage, setCategoriesPerPage] = useState(6);
  const [totalCategories, setTotalCategories] = useState(0);
  const [cachedCategories, setCachedCategories] = useState({});

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newImages, setNewImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const fetchCategories = useCallback(async () => {
    const cacheKey = `${currentPage}-${categoriesPerPage}`;

    if (cachedCategories[cacheKey]) {
      setCategories(cachedCategories[cacheKey]);
    } else {
      try {
        const { data, total } = await fetchCategoriesForProductFromAPI(
          currentPage,
          categoriesPerPage
        );
        setCategories(data);
        setTotalCategories(total);

        setCachedCategories((prev) => ({
          ...prev,
          [cacheKey]: data,
        }));
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    }
  }, [currentPage, categoriesPerPage, cachedCategories]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const filteredData = useMemo(
    () =>
      categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [categories, searchTerm]
  );

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handleCategoriesPerPageChange = useCallback((value) => {
    setCategoriesPerPage(value);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const categoryData = {
      newCategoryName,
      newImages,
    };
    console.log("Category added:", categoryData);

    // Xử lý logic gửi danh mục lên server ở đây

    resetForm();
  };
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);

    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previewUrls);
  };

  const handleRemoveImage = (indexToRemove) => {
    setNewImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, index) => index !== indexToRemove)
    );
  };
  const resetForm = () => {
    setNewCategoryName("");
    setNewImages([]);
    setImagePreviews([]);
    setIsDialogOpen(false);
  };

  return (
    <div>
      <div className="mx-4 bg-[#282941] p-4 rounded-md  flex flex-col flex-1">
        <CategoryTableHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          categoriesPerPage={categoriesPerPage}
          onCategoriesPerPageChange={handleCategoriesPerPageChange}
          onSetIsDialogOpen={setIsDialogOpen}
        />
        <div className="bg-[#282941] pt-3 pb-4 rounded-sm  flex-1">
          <strong className="text-white font-medium">Danh sách sản phẩm</strong>
          <div className="mt-3">
            <table className="w-full text-white border-x-gray-400">
              <thead>
                <tr className="bg-[#2E3044] h-10">
                  <td className="pl-2">Danh mục</td>
                  <td>Tổng sản phẩm</td>
                  <td>Thu nhập</td>
                  <td></td>
                </tr>
              </thead>
              <tbody className="h-[50vh]">
                {filteredData.map((items, index) => (
                  <tr key={index} className="border-b-2">
                    <td>
                      <div className="bg-[#282941] rounded-sm flex-1 flex items-center">
                        <img
                          src={items.image}
                          alt="Category"
                          className="w-10 h-10 rounded-sm object-cover"
                        />
                        <div className="pl-2">
                          <Link
                            to={`categorydetail/${items.id}`}
                            className="text text-sm font-semibold text-[#787BFF]"
                          >
                            {items.name}
                          </Link>
                          {/* <div classN ame="flex items-center">
                            <strong className="text-xs text-white font-light">
                              {items.description}
                            </strong>
                          </div> */}
                        </div>
                      </div>
                    </td>

                    <td>{items.quantity}</td>
                    <td>đ{items.saleprice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-end">
            <Pagination
              showSizeChanger={false}
              current={currentPage}
              onChange={handlePageChange}
              total={totalCategories}
              pageSize={categoriesPerPage}
              className="custom-pagination"
            />
          </div>
        </div>
      </div>
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        className="relative z-10"
      >
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-[40rem] space-y-4 p-12 bg-[#282941] backdrop-blur-2xl rounded-xl">
              <DialogTitle
                as="h3"
                className="text-lg font-medium leading-6 text-white"
              >
                Thêm danh mục mới
              </DialogTitle>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white">
                      Tên danh mục
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className="ext-sm focus:outline-none border border-gray-300 mt-1 p-2 w-full rounded-md bg-[#282941] text-white"
                      placeholder="Tên danh mục"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white">
                      Ảnh
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="w-full p-3 border rounded-sm bg-[#282941] text-white focus:outline-none"
                      required
                    />
                  </div>
                  {imagePreviews.length > 0 && (
                    <div className="mb-4 grid grid-cols-2 gap-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`Xem trước hình ảnh ${index + 1}`}
                            className="w-64 h-60 object-cover rounded-md"
                          />

                          <button
                            type="button"
                            className="absolute top-0 right-0 text-black p-2 rounded-md"
                            onClick={() => handleRemoveImage(index)}
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-4 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsDialogOpen(false)}
                    className="bg-gray-300 text-black px-4 py-2 rounded-md"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="bg-[#2563EB] text-white px-4 py-2 rounded-md"
                  >
                    Xác nhận
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <div>.</div>
    </div>
  );
}

export default CategoryList;
