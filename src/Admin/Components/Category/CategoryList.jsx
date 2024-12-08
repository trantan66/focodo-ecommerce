import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CategoryTableHeader from './CategoryTableHeader';
import { notification, Pagination, Popconfirm, Select } from 'antd';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import {
    addCategoryToAPI,
    DeleteCategory,
    fetchAllCategoriesFromAPI,
    fetchCategoriesFromAPI,
    fetchCategoryByIdFromAPI,
    updateCategoryToAPI,
} from '../../../Services/CategoryService';
import { FaTrashAlt } from 'react-icons/fa';
import { FiLoader } from 'react-icons/fi';

function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoriesPerPage, setCategoriesPerPage] = useState(6);
    const [totalCategories, setTotalCategories] = useState(0);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

    const [name, setNewCategoryName] = useState('');
    const [image, setNewImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [description, setNewDescription] = useState();
    const [parent_category, setNewParentscategory] = useState();
    // const [selectedParentCategories, setSelectedParentCategories] = useState([]);

    const [checkImageQuantity, setCheckImageQuantity] = useState(false);
    const [loadingIcon, setLoadingIcon] = useState(false);
    const [loadingScreen, setLoadingScreen] = useState(false);

    // update
    const [allCategories, setAllCategories] = useState([]);
    const [nameUpdate, setNameUpdate] = useState('');
    const [descriptionUpdate, setDesciptionUpdate] = useState();
    const [parentCategoryUpdate, setParentcategoryUpdate] = useState();
    const [imageUpdate, setImageUpdate] = useState();
    const [checkImageQuantityUpdate, setCheckImageQuantityUpdate] = useState(true);
    const [idCategory, setIdCategory] = useState();

    const fetchCategoryById = async (categoryId) => {
        try {
            const { data } = await fetchCategoryByIdFromAPI(categoryId);

            setNameUpdate(data.name);
            setDesciptionUpdate(data.description);
            setParentcategoryUpdate(data.parent_category);
            setImageUpdate(data.image);
        } catch (error) {
            console.error('Error fetching product by id:', error);
        }
    };

    const handleCategoryUpdateDialog = (CategoryId) => {
        setIdCategory(CategoryId);
        setIsUpdateDialogOpen(true);
        fetchCategoryById(CategoryId);
    };

    const fetchCategories = async (currentPage, categoriesPerPage) => {
        try {
            const { data, total } = await fetchCategoriesFromAPI(currentPage, categoriesPerPage);

            setCategories(data);
            setTotalCategories(total);
        } catch (error) {
            console.error('Lỗi khi lấy danh mục:', error);
        }
    };

    useEffect(() => {
        fetchCategories(currentPage, categoriesPerPage);
    }, [currentPage, categoriesPerPage]);

    const fetchAllCategories = async () => {
        try {
            const { data } = await fetchAllCategoriesFromAPI();
            const filteredCategories = data.filter((category) => category.id !== 1 && category.id !== 2);
            setAllCategories(filteredCategories);
        } catch (error) {
            console.error('Lỗi khi lấy danh mục:', error);
        }
    };
    useEffect(() => {
        fetchAllCategories();
    }, []);

    const filteredData = useMemo(
        () => categories.filter((category) => category?.name?.toLowerCase().includes(searchTerm.toLowerCase())),
        [categories, searchTerm],
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
        setLoadingScreen(true);

        const categoryData = {
            name,
            description,
            parent_category,
        };

        try {
            await addCategoryToAPI(categoryData, image);
            resetForm();
        } catch (error) {
            console.error('Error adding the category:', error);
            notification.error({
                message: 'Có lỗi xảy ra!',
                description: 'Không thể cập nhật danh mục. Vui lòng thử lại.',
            });
        } finally {
            notification.success({
                message: 'Thêm danh mục thành công!',
                description: 'Danh mục đã được thêm.',
            });
            await fetchCategories(currentPage, categoriesPerPage);
            setLoadingIcon(false);
            setLoadingScreen(false);
        }
        setCheckImageQuantity(false);
    };
    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        setLoadingIcon(true);
        setLoadingScreen(true);
        const categoryData = {
            name: nameUpdate,
            description: descriptionUpdate,
            parent_category: parentCategoryUpdate,
        };
        try {
            await updateCategoryToAPI(idCategory, categoryData, image);
        } catch (error) {
            console.error('Error updating the category:', error);
            notification.error({
                message: 'Có lỗi xảy ra!',
                description: 'Không thể cập nhật danh mục. Vui lòng thử lại.',
            });
        } finally {
            notification.success({
                message: 'Cập nhật danh mục thành công!',
                description: 'Danh mục đã được cập nhật.',
            });
            setLoadingIcon(false);
            setLoadingScreen(false);
            closeUpdateDialog();
            setImagePreviews('');
            await fetchCategories(currentPage, categoriesPerPage);
            // setTimeout(() => {
            //     window.location.reload();
            // }, 500);
        }
    };
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setNewImages(files);
        const previewUrls = files.map((file) => URL.createObjectURL(file));
        setImagePreviews(previewUrls);

        setCheckImageQuantity(true);
        setCheckImageQuantityUpdate(true);

        e.target.value = null;
    };

    const handleRemoveImage = (indexToRemove) => {
        setNewImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
        setImagePreviews((prevPreviews) => prevPreviews.filter((_, index) => index !== indexToRemove));

        setCheckImageQuantity(false);
        setCheckImageQuantityUpdate(false);
    };
    const handleCategoryChange = (CategoryId) => {
        setNewParentscategory(CategoryId);
    };
    const handleCategoryChangeUpdate = (CategoryId) => {
        setParentcategoryUpdate(CategoryId);
    };

    const handleRemoveCategory = async (categoryId) => {
        try {
            await DeleteCategory(categoryId);
        } catch (error) {
            console.error('Error deleting the category:', error);
            notification.error({
                message: 'Có lỗi xảy ra!',
                description: 'Không thể xóa danh mục. Vui lòng thử lại.',
            });
        } finally {
            notification.success({
                message: 'Xóa danh mục thành công!',
                description: 'Danh mục đã được xóa khỏi danh sách.',
            });
            await fetchCategories(currentPage, categoriesPerPage);
        }
    };

    const handleRemoveImageUpdate = () => {
        setCheckImageQuantityUpdate(false);
        setImageUpdate('');
    };

    const resetForm = () => {
        setNewCategoryName('');
        setNewImages([]);
        setImagePreviews([]);
        setIsDialogOpen(false);
        setNewDescription('');
    };
    const closeUpdateDialog = () => {
        setIsUpdateDialogOpen(false);
        setCheckImageQuantityUpdate(true);
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
                                    <td className="text-center">Tổng sản phẩm</td>
                                    <td className="text-center">Số lượng danh mục nhỏ</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody className="h-[50vh]">
                                {filteredData.map((items, index) => (
                                    <tr key={index} className="border-b-2">
                                        <td>
                                            <div className="bg-[#282941] rounded-sm flex-1 flex items-center">
                                                <img
                                                    src={
                                                        items.image
                                                            ? items.image
                                                            : 'https://ingianguyen.com/wp-content/uploads/in-giay-goi-qua-tai-da-nang-5.jpg'
                                                    }
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
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-center">{items.number_of_products}</td>
                                        <td className="text-center">{items.subcategories.length}</td>
                                        <td>
                                            <Popconfirm
                                                title="Bạn có chắc chắn muốn xóa danh mục này không?"
                                                onConfirm={() => handleRemoveCategory(items.id)}
                                                okText="Có"
                                                cancelText="Không"
                                                placement="topRight"
                                            >
                                                <button className="bg-red-500 p-2 rounded-md">
                                                    <FaTrashAlt />
                                                </button>
                                            </Popconfirm>
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
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} className="relative z-10">
                {loadingScreen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                        <FiLoader className="text-white text-6xl animate-spin" />
                    </div>
                )}
                <div className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel className="w-[40rem] space-y-4 p-12 bg-[#282941] backdrop-blur-2xl rounded-xl">
                            <DialogTitle as="h3" className="text-lg font-medium leading-6 text-white">
                                Thêm danh mục mới
                            </DialogTitle>
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-white">Tên danh mục</label>
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
                                            defaultValue={'Danh mục lớn (tùy chọn)'}
                                            style={{
                                                width: '100%',
                                                height: 40,
                                                backgroundColor: '#282941',
                                            }}
                                            onChange={handleCategoryChange}
                                            dropdownStyle={{
                                                maxHeight: 300,
                                                overflowY: 'auto',
                                                backgroundColor: '#282941',
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
                                        value={description}
                                        onChange={(e) => setNewDescription(e.target.value)}
                                        className="w-full p-3 border rounded-sm bg-[#282941] text-white focus:outline-none"
                                        placeholder="Nhập mô tả danh mục"
                                        rows="4"
                                    />

                                    <div>
                                        <label className="block text-sm font-medium text-white">Ảnh</label>
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
               ${loadingIcon ? 'bg-gray-400' : 'bg-[#2563EB] hover:bg-blue-500'}`}
                                        disabled={loadingIcon ? 'true' : ''}
                                    >
                                        {loadingIcon ? <FiLoader /> : ''}
                                        <span>Xác nhận</span>
                                    </button>
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>

            {/* update dialog*/}
            <Dialog open={isUpdateDialogOpen} onClose={() => closeUpdateDialog()} className="relative z-10">
                {loadingScreen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                        <FiLoader className="text-white text-6xl animate-spin" />
                    </div>
                )}
                <div className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel className="w-[40rem] space-y-4 p-12 bg-[#282941] backdrop-blur-2xl rounded-xl">
                            <DialogTitle as="h3" className="text-lg font-medium leading-6 text-white">
                                Cập nhật danh mục
                            </DialogTitle>
                            <form onSubmit={handleSubmitUpdate} encType="multipart/form-data">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-white">Tên danh mục</label>
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
                                            value={parentCategoryUpdate}
                                            style={{
                                                width: '100%',
                                                height: 40,
                                                backgroundColor: '#282941',
                                            }}
                                            onChange={handleCategoryChangeUpdate}
                                            dropdownStyle={{
                                                maxHeight: 300,
                                                overflowY: 'auto',
                                                backgroundColor: '#282941',
                                            }}
                                            options={[
                                                { value: null, label: 'Không' },
                                                ...(Array.isArray(allCategories)
                                                    ? allCategories.map((category) => ({
                                                          value: category.id,
                                                          label: category.name,
                                                      }))
                                                    : []),
                                            ]}
                                        />
                                    </div>

                                    <textarea
                                        value={descriptionUpdate}
                                        onChange={(e) => setDesciptionUpdate(e.target.value)}
                                        className="w-full p-3 border rounded-sm bg-[#282941] text-white focus:outline-none"
                                        placeholder="Nhập mô tả danh mục"
                                        rows="4"
                                    />

                                    <div>
                                        <label className="block text-sm font-medium text-white">Ảnh</label>
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
                                                        className="w-64 h-60 rounded-md border-none"
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
                                    {imageUpdate && imagePreviews.length === 0 ? (
                                        <div className="mb-4 grid grid-cols-2 gap-4">
                                            <div className="relative">
                                                <img
                                                    src={imageUpdate}
                                                    alt=""
                                                    className="w-64 h-60 rounded-md border-none"
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
                                        ''
                                    )}
                                </div>
                                <div className="flex justify-end gap-4 mt-4">
                                    <button
                                        type="button"
                                        onClick={() => closeUpdateDialog()}
                                        className="bg-gray-300 text-black px-4 py-2 rounded-md"
                                    >
                                        Hủy
                                    </button>

                                    <button
                                        type="submit"
                                        className={`rounded-md text-white px-4 py-2 flex items-center justify-center space-x-2
               ${loadingIcon ? 'bg-gray-400' : 'bg-[#2563EB] hover:bg-blue-500'}`}
                                        disabled={loadingIcon ? 'true' : ''}
                                    >
                                        {loadingIcon ? <FiLoader /> : ''}
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
