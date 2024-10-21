import React, { useCallback, useEffect, useMemo, useState } from "react";
import CategoryTableHeader from "./CategoryTableHeader";
import { notification, Pagination, Select } from "antd";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import {
  addCategoryToAPI,
  DeleteCategory,
  fetchAllCategoriesFromAPI,
  fetchCategoriesFromAPI,
  fetchCategoryByIdFromAPI,
} from "../../../Services/CategoryService";
import { FaTrashAlt } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriesPerPage, setCategoriesPerPage] = useState(6);
  const [totalCategories, setTotalCategories] = useState(0);
  const [cachedCategories, setCachedCategories] = useState({});

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const [name, setNewCategoryName] = useState("");
  const [image, setNewImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [description, setNewDescription] = useState();
  const [parent_category, setNewParentscategory] = useState();
  // const [selectedParentCategories, setSelectedParentCategories] = useState([]);

  const [checkImageQuantity, setCheckImageQuantity] = useState(false);
  const [loadingIcon, setLoadingIcon] = useState(false);

  // update
  const [allCategories, setAllCategories] = useState([]);
  const [nameUpdate, setNameUpdate] = useState("");
  const [descriptionUpdate, setDesciptionUpdate] = useState();
  const [parentCategoryUpdate, setParentcategoryUpdate] = useState();
  const [imageUpdate, setImageUpdate] = useState();
  const [checkImageQuantityUpdate, setCheckImageQuantityUpdate] =
    useState(true);

  const fetchCategoryById = async (categoryId) => {
    try {
      const { data } = await fetchCategoryByIdFromAPI(categoryId);

      setNameUpdate(data.name);
      setDesciptionUpdate(data.description);
      setParentcategoryUpdate(data.parent_category);
      setImageUpdate(data.image);
    } catch (error) {
      console.error("Error fetching product by id:", error);
    }
  };

  const handleCategoryUpdateDialog = (CategoryId) => {
    setIsUpdateDialogOpen(true);
    fetchCategoryById(CategoryId);
  };

  const fetchCategories = useCallback(async () => {
    const cacheKey = `${currentPage}-${categoriesPerPage}`;

    if (cachedCategories[cacheKey]) {
      setCategories(cachedCategories[cacheKey]);
    } else {
      try {
        const { data, total } = await fetchCategoriesFromAPI(
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await fetchAllCategoriesFromAPI();
        const filteredCategories = data.filter(
          (category) => category.id !== 1 && category.id !== 2
        );
        setAllCategories(filteredCategories);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };
    fetchCategories();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingIcon(true);
    const categoryData = {
      name,
      description,
      parent_category,
    };
    console.log("Category added:", categoryData, image);

    try {
      await addCategoryToAPI(categoryData, image);
      resetForm();
      notification.success({
        message: "Thêm danh mục thành công!",
        description: "Danh mục đã được thêm.",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error adding the category:", error);
      notification.error({
        message: "Có lỗi xảy ra!",
        description: "Không thể cập nhật danh mục. Vui lòng thử lại.",
      });
    }
    setCheckImageQuantity(false);
  };
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    // setLoadingIcon(true);

    // setCheckImageQuantity(false);
  };
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previewUrls);

    setCheckImageQuantity(true);
    setCheckImageQuantityUpdate(true);
  };

  const handleRemoveImage = (indexToRemove) => {
    setNewImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, index) => index !== indexToRemove)
    );

    setCheckImageQuantity(false);
    setCheckImageQuantityUpdate(false);
  };
  const handleCategoryChange = (CategoryId) => {
    setNewParentscategory(CategoryId);
  };
  const handleCategoryChangeUpdate = (CategoryId) => {
    setParentcategoryUpdate(CategoryId);
  };
  // const handleCategoryChange = (selectedSubCategoryId) => {
  //   const selectedSubCategory = allCategories.find(
  //     (category) => category.id === selectedSubCategoryId
  //   );

  //   if (
  //     selectedSubCategory &&
  //     !selectedParentCategories.some((cat) => cat.id === selectedSubCategory.id)
  //   ) {
  //     setSelectedParentCategories((prevSelected) => [
  //       ...prevSelected,
  //       selectedSubCategory,
  //     ]);

  //     setNewParentscategories((prevNewSub) => [
  //       ...prevNewSub,
  //       selectedSubCategory,
  //     ]);
  //   } else {
  //     console.log("Subcategory not found or already selected.");
  //   }
  // };

  // const handleRemoveCategory = (categoryToRemove) => {
  //   setSelectedParentCategories(
  //     selectedParentCategories.filter(
  //       (category) => category.id !== categoryToRemove.id
  //     )
  //   );
  // };

  const handleRemoveCategory = async (categoryId) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa danh mục này?");
    if (confirmed) {
      try {
        await DeleteCategory(categoryId);
        notification.success({
          message: "Xóa danh mục thành công!",
          description: "Danh mục đã được xóa khỏi danh sách.",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.error("Error deleting the category:", error);
        notification.error({
          message: "Có lỗi xảy ra!",
          description: "Không thể xóa danh mục. Vui lòng thử lại.",
        });
      }
    }
  };

  const handleRemoveImageUpdate = () => {
    setCheckImageQuantityUpdate(false);
    setImageUpdate("");
  };

  const resetForm = () => {
    setNewCategoryName("");
    setNewImages([]);
    setImagePreviews([]);
    setIsDialogOpen(false);
    setNewDescription("");
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
                  <td>Mô tả</td>
                  <td className="text-center">Tổng sản phẩm</td>
                  <td>Danh mục phụ</td>
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
                          <button
                            className="text text-sm font-semibold text-[#787BFF]"
                            onClick={() => handleCategoryUpdateDialog(items.id)}
                          >
                            {items.name}
                          </button>
                          {/* <div classN ame="flex items-center">
                            <strong className="text-xs text-white font-light">
                              {items.description}
                            </strong>
                          </div> */}
                        </div>
                      </div>
                    </td>
                    <td className="max-w-96">{items.description}</td>
                    <td className="text-center">{items.number_of_products}</td>
                    <td>
                      <select className="bg-[#282941]">
                        {items.subcategories.length > 0 ? (
                          ((<option> mục lục phụ</option>),
                          items.subcategories.map((subcategories) => (
                            <option
                              key={subcategories.id}
                              value={subcategories.name}
                            >
                              {subcategories.name}
                            </option>
                          )))
                        ) : (
                          <option value={"Không mục lục phụ"}>
                            Không mục lục phụ
                          </option>
                        )}
                      </select>
                    </td>
                    <td>
                      <button
                        className="bg-red-500 p-2 rounded-md"
                        onClick={() => handleRemoveCategory(items.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
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
                      value={name}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className="ext-sm focus:outline-none border border-gray-300 mt-1 p-3 w-full rounded-md bg-[#282941] text-white"
                      placeholder="Tên danh mục"
                      required
                    />
                  </div>
                  <div className="flex items-center flex-col">
                    <Select
                      defaultValue={"Danh mục lớn (tùy chọn)"}
                      style={{
                        width: "100%",
                        height: 40,
                        backgroundColor: "#282941",
                      }}
                      onChange={handleCategoryChange}
                      dropdownStyle={{
                        maxHeight: 300,
                        overflowY: "auto",
                        backgroundColor: "#282941",
                      }}
                      options={
                        Array.isArray(allCategories)
                          ? allCategories.map((category) => ({
                              value: category.id,
                              label: category.name,
                            }))
                          : []
                      }
                    />
                    {/* {selectedParentCategories.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2 self-start">
                        {selectedParentCategories.map((category) => (
                          <div
                            key={category.id}
                            className="bg-[#B1C1C0] text-gray-800 p-2 rounded-md flex items-center"
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
                    )} */}
                  </div>

                  <textarea
                    value={description}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full p-3 border rounded-sm bg-[#282941] text-white focus:outline-none"
                    placeholder="Nhập mô tả danh mục"
                    rows="4"
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium text-white">
                      Ảnh
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full p-3 border rounded-sm bg-[#282941] text-white focus:outline-none"
                      required
                      disabled={checkImageQuantity ? true : false}
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
                    className={`rounded-md text-white px-4 py-2 flex items-center justify-center space-x-2
               ${
                 loadingIcon ? "bg-gray-400" : "bg-[#2563EB] hover:bg-blue-500"
               }`}
                    disabled={loadingIcon ? "true" : ""}
                  >
                    {loadingIcon ? <FiLoader /> : ""}
                    <span>Xác nhận</span>
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <Dialog
        open={isUpdateDialogOpen}
        onClose={() => setIsUpdateDialogOpen(false)}
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
                Cập nhật danh mục
              </DialogTitle>
              <form onSubmit={handleSubmitUpdate} encType="multipart/form-data">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white">
                      Tên danh mục
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={nameUpdate}
                      onChange={(e) => setNameUpdate(e.target.value)}
                      className="ext-sm focus:outline-none border border-gray-300 mt-1 p-3 w-full rounded-md bg-[#282941] text-white"
                      placeholder="Tên danh mục"
                      required
                    />
                  </div>
                  <div className="flex items-center flex-col">
                    <Select
                      defaultValue={parentCategoryUpdate}
                      // value={parentCategoryUpdate}
                      style={{
                        width: "100%",
                        height: 40,
                        backgroundColor: "#282941",
                      }}
                      onChange={handleCategoryChangeUpdate}
                      dropdownStyle={{
                        maxHeight: 300,
                        overflowY: "auto",
                        backgroundColor: "#282941",
                      }}
                      options={
                        Array.isArray(allCategories)
                          ? allCategories.map((category) => ({
                              value: category.id,
                              label: category.name,
                            }))
                          : []
                      }
                    />
                  </div>

                  <textarea
                    value={descriptionUpdate}
                    onChange={(e) => setDesciptionUpdate(e.target.value)}
                    className="w-full p-3 border rounded-sm bg-[#282941] text-white focus:outline-none"
                    placeholder="Nhập mô tả danh mục"
                    rows="4"
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium text-white">
                      Ảnh
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full p-3 border rounded-sm bg-[#282941] text-white focus:outline-none"
                      required
                      disabled={checkImageQuantityUpdate ? true : false}
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
                  {imageUpdate !== "" && imagePreviews.length === 0 ? (
                    <div className="mb-4 grid grid-cols-2 gap-4">
                      <div className="relative">
                        <img
                          src={imageUpdate}
                          alt=""
                          className="w-64 h-60 object-cover rounded-md"
                        />
                        <button
                          className="absolute top-0 right-1 text-black p-2 rounded-md"
                          onClick={() => handleRemoveImageUpdate()}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ) : (
                    ""
                  )
                    
                  }
                </div>
                <div className="flex justify-end gap-4 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsUpdateDialogOpen(false)}
                    className="bg-gray-300 text-black px-4 py-2 rounded-md"
                  >
                    Hủy
                  </button>

                  <button
                    type="submit"
                    className={`rounded-md text-white px-4 py-2 flex items-center justify-center space-x-2
               ${
                 loadingIcon ? "bg-gray-400" : "bg-[#2563EB] hover:bg-blue-500"
               }`}
                    disabled={loadingIcon ? "true" : ""}
                  >
                    {loadingIcon ? <FiLoader /> : ""}
                    <span>Xác nhận</span>
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
