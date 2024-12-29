import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../CustomCss/Slider.css';
import {
    ActiveProduct,
    DeleteProduct,
    fetchProductByIdFromAPI,
    updateProductToAPI,
} from '../../../Services/ProductService';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { notification, Select } from 'antd';
import { FiLoader } from 'react-icons/fi';
import { fetchAllCategoriesFromAPI } from '../../../Services/CategoryService';
import { isValidImageType } from '../../../utils/IsValidImageType';
import CustomModal from '../../../utils/CustomModal';

function ProductDetail() {
    const { productId } = useParams();

    const [name, setProductName] = useState('');
    const [quantity, setProductQuantity] = useState('');
    const [package_quantity, setProductPackageQuantity] = useState('');
    const [sub_description, setSubDescription] = useState('');
    const [main_description, setMainDescription] = useState('');
    const [original_price, setOriginalPrice] = useState('');
    const [sell_price, setSalePrice] = useState('');
    const discount = ((original_price - sell_price) / original_price).toFixed(2);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [removeSelectedCategories, setRemoveSelectedCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    const [currentImages, setCurrentImages] = useState([]);

    const [loadingIcon, setLoadingIcon] = useState(false);
    const [loadingScreen, setLoadingScreen] = useState(false);

    const [isDelete, setIsDelete] = useState('');

    const fetchCategories = async () => {
        try {
            const { data } = await fetchAllCategoriesFromAPI();
            const filteredCategories = data.filter((category) => category.id !== 1 && category.id !== 2);
            setCategories(filteredCategories);
        } catch (error) {
            console.error('Lỗi khi lấy danh mục:', error);
        }
    };
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchProductById = async (productId) => {
        try {
            const { data } = await fetchProductByIdFromAPI(productId);
            const filteredCategories = data.categories.filter((category) => category.id !== 1 && category.id !== 2);
            setSelectedCategories(filteredCategories);

            setCurrentImages(data.images);

            setProductName(data.name);
            setProductQuantity(data.quantity);
            setProductPackageQuantity(data.package_quantity);
            setOriginalPrice(data.original_price);
            setSalePrice(data.sell_price);

            setSubDescription(data.sub_description);
            setMainDescription(data.main_description);

            setIsDelete(data._delete);
        } catch (error) {
            console.error('Error fetching product by id:', error);
        }
    };
    useEffect(() => {
        fetchProductById(productId);
    }, [productId]);

    const handleSubmit = async (e) => {
        setLoadingIcon(true);
        setLoadingScreen(true);

        e.preventDefault();

        const isValidInteger = (value) => /^\d+$/.test(value);

        if (!isValidInteger(quantity)) {
            notification.error({
                message: 'Lỗi đầu vào!',
                description: 'Số lượng sản phẩm phải là số nguyên hợp lệ.',
            });
            setLoadingIcon(false);
            setLoadingScreen(false);
            return;
        }

        if (!isValidInteger(package_quantity) || parseInt(package_quantity, 10) <= 0) {
            notification.error({
                message: 'Lỗi đầu vào!',
                description: 'Số lượng đóng gói phải là số nguyên lớn hơn 0.',
            });
            setLoadingIcon(false);
            setLoadingScreen(false);
            return;
        }

        if (!isValidInteger(original_price)) {
            notification.error({
                message: 'Lỗi đầu vào!',
                description: 'Giá gốc phải là số nguyên hợp lệ.',
            });
            setLoadingIcon(false);
            setLoadingScreen(false);
            return;
        }

        if (!isValidInteger(sell_price)) {
            notification.error({
                message: 'Lỗi đầu vào!',
                description: 'Giá bán phải là số nguyên hợp lệ.',
            });
            setLoadingIcon(false);
            setLoadingScreen(false);
            return;
        }

        const categoryIds = selectedCategories.map((category) => category.id);
        categoryIds.unshift(1);

        const categoryRemovedIds = removeSelectedCategories.map((category) => category.id);

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

        try {
            await updateProductToAPI(productId, product, images, currentImages, categoryRemovedIds);
        } catch (error) {
            console.error('Error updating the product:', error);
            notification.error({
                message: 'Có lỗi xảy ra!',
                description: 'Không thể cập nhật sản phẩm. Vui lòng thử lại.',
            });
        } finally {
            notification.success({
                message: 'Cập nhật sản phẩm thành công!',
                description: 'Sản phẩm đã được cập nhật.',
            });
            setLoadingIcon(false);
            setLoadingScreen(false);
            setImagePreviews([]);
            await fetchProductById(productId);
            await fetchCategories();
        }
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        files.forEach((element) => {
            if (isValidImageType(element)) {
                setImages(files);
                const previewUrls = files.map((file) => URL.createObjectURL(file));
                setImagePreviews(previewUrls);
                e.target.value = null;
            } else {
                e.target.value = null;
                notification.error({
                    message: 'Cập nhập thất bại!',
                    description: 'Vui lòng chọn một file ảnh hợp lệ (JPEG, PNG, GIF, WEBP)',
                    duration: 3,
                });
            }
        });
    };

    const handleRemoveImage = (indexToRemove) => {
        setImages((prevImages) => {
            const updatedImages = prevImages.filter((_, index) => index !== indexToRemove);
            URL.revokeObjectURL(imagePreviews[indexToRemove]);

            return updatedImages;
        });

        setImagePreviews((prevPreviews) => prevPreviews.filter((_, index) => index !== indexToRemove));
    };

    const handleCategoryChange = (selectedCategoryName) => {
        const selectedCategory = categories.find((category) => category.name === selectedCategoryName);

        if (selectedCategory && !selectedCategories.some((cat) => cat.id === selectedCategory.id)) {
            setSelectedCategories([...selectedCategories, selectedCategory]);
        }
    };

    const handleRemoveCategory = (categoryToRemove) => {
        setSelectedCategories(selectedCategories.filter((category) => category.id !== categoryToRemove.id));
        setRemoveSelectedCategories((prevCategories) => [...prevCategories, categoryToRemove]);
    };

    const handleRemoveCurrentImages = (imageToRemove) => {
        setCurrentImages((prevImages) => prevImages.filter((image) => image !== imageToRemove));
    };
    const handleRemoveProduct = async (productId) => {
        try {
            await DeleteProduct(productId);
            notification.success({
                message: 'Cập nhập thành công!',
                description: 'Sản phẩm đã bị ngừng bán.',
            });
        } catch (error) {
            console.error('Error deleting the product:', error);
            notification.error({
                message: 'Có lỗi xảy ra!',
                description: 'Không thể ngừng bán sản phẩm. Vui lòng thử lại.',
            });
        } finally {
            await fetchProductById(productId);
            setIsDelete(!isDelete);
        }
    };
    const handleActiveProduct = async (productId) => {
        try {
            await ActiveProduct(productId);
            notification.success({
                message: 'Cập nhập thành công!',
                description: 'Sản phẩm đã được bán lại.',
            });
        } catch (error) {
            console.error('Error deleting the product:', error);
            notification.error({
                message: 'Có lỗi xảy ra!',
                description: 'Không thể bán lại sản phẩm. Vui lòng thử lại.',
            });
        } finally {
            await fetchProductById(productId);
            setIsDelete(!isDelete);
        }
    };
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        !isDelete ? handleRemoveProduct(productId) : handleActiveProduct(productId);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className="relative">
            {loadingScreen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <FiLoader className="text-white text-6xl animate-spin" />
                </div>
            )}
            <div className="px-4 flex flex-col flex-1">
                {!isDelete ? (
                    <div className="rounded-md flex flex-row justify-between flex-1">
                        <span className="text-white text-3xl mb-4">Sản phẩm #{productId}</span>
                        <button
                            className="text-red-500  bg-[#4D2F3A] px-6 mb-3 rounded-md hover:bg-red-800"
                            onClick={() => showModal()}
                        >
                            Ngừng bán
                        </button>
                    </div>
                ) : (
                    <div className="rounded-md flex flex-row justify-between flex-1">
                        <span className="text-white text-3xl mb-4">Sản phẩm #{productId}</span>
                        <button
                            className="text-[#03C3EC]  bg-[#25445C] px-6 mb-3 rounded-md hover:bg-cyan-800"
                            onClick={() => showModal()}
                        >
                            Bán lại
                        </button>
                    </div>
                )}

                <div className="rounded-md flex flex-1">
                    <div className="flex-[1] bg-[#282941] mr-2 mb-4 max-h-auto overflow-auto">
                        <div className="grid grid-cols-2 gap-4 p-3">
                            {currentImages.map((item) => (
                                <div className="relative" key={item}>
                                    <img src={item} alt="Product" className="w-full rounded-sm object-cover" />
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
                                    <span className=" text-white mb-1 self-start">Tên sản phẩm</span>
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
                                    <span className=" text-white mb-1 self-start">Số lượng / gói</span>
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
                                <Select
                                    defaultValue={'Danh mục'}
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
                                        Array.isArray(categories)
                                            ? categories.map((category) => ({
                                                  value: category.name,
                                                  label: category.name,
                                              }))
                                            : []
                                    }
                                />

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
                                    <span className=" text-white mb-1 self-start">Giá sản phẩm (VNĐ)</span>
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
                                    <span className=" text-white mb-1 self-start ">Giá bán (VNĐ)</span>
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
                                    data={main_description || ''}
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
                                className={`w-full p-3 rounded-md text-white flex items-center justify-center space-x-2
               ${loadingIcon ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-500'}`}
                                disabled={loadingIcon ? true : ''}
                            >
                                {loadingIcon ? <FiLoader /> : ''}
                                <span>Cập nhật</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <CustomModal isOpen={isModalOpen} title="Basic Modal" onOk={handleOk} onCancel={handleCancel}>
                {!isDelete ? (
                    <span>Bạn có chắc chắn muốn ngừng bán sản phẩm này?</span>
                ) : (
                    <span>Bạn có chắc chắn muốn bán lại sản phẩm này?</span>
                )}
            </CustomModal>
        </div>
    );
}

export default ProductDetail;
