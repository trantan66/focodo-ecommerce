import React, { useEffect, useState } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { addProductToAPI } from '../../../Services/ProductService';
import { notification, Select } from 'antd';
import { FiLoader } from 'react-icons/fi';
import '../CustomCss/CustomSelect.css';
import { fetchAllCategoriesFromAPI } from '../../../Services/CategoryService';

const AddProduct = () => {
    // const navigate = useNavigate();

    const [name, setProductName] = useState('');
    const [quantity, setProductQuantity] = useState('');
    const [package_quantity, setProductPackageQuantity] = useState('');
    const [sub_description, setSubDescription] = useState('');
    const [main_description, setMainDescription] = useState('');
    const [original_price, setOriginalPrice] = useState('');
    const [sell_price, setSalePrice] = useState('');
    const discount = ((original_price - sell_price) / original_price).toFixed(2);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    const [loadingIcon, setLoadingIcon] = useState(false);
    const [loadingScreen, setLoadingScreen] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await fetchAllCategoriesFromAPI();
                const filteredCategories = data.filter((category) => category.id !== 1 && category.id !== 2);
                setCategories(filteredCategories);
            } catch (error) {
                console.error('Lỗi khi lấy danh mục:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingIcon(true);
        setLoadingScreen(true);
        const categoryIds = selectedCategories.map((category) => category.id);
        categoryIds.unshift(1);

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
            await addProductToAPI(product, images);
            resetForm();
            notification.success({
                message: 'Thêm sản phẩm thành công!',
                description: 'Sản phẩm đã được thêm.',
            });
        } catch (error) {
            console.error('Error adding the product:', error);
            notification.error({
                message: 'Có lỗi xảy ra!',
                description: 'Không thể cập nhật sản phẩm. Vui lòng thử lại.',
            });
        } finally {
            setLoadingIcon(false);
            setLoadingScreen(false);
        }
    };
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
    
        const previewUrls = files.map((file) => URL.createObjectURL(file));
        setImagePreviews(previewUrls);
    
        e.target.value = null;
    };
    

    const handleRemoveImage = (indexToRemove) => {
        setImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
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
    };

    const resetForm = () => {
        setProductName('');
        setMainDescription('');
        setSubDescription('');
        setProductQuantity('');
        setOriginalPrice('');
        setSalePrice('');
        setSelectedCategories([]);
        setImages([]);
        setImagePreviews([]);
        setProductPackageQuantity('');
    };

    return (
        <div className="relative">
            {loadingScreen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <FiLoader className="text-white text-6xl animate-spin" />
                </div>
            )}
            <div className="flex gap-4 px-4 pb-4 flex-row">
                <div className="bg-[#282941] p-4 rounded-md  flex flex-col flex-[2]">
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
                        <div className="flex items-center flex-col">
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
                                data={main_description}
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
                                required={images.length === 0}
                            />
                        </div>

                        {/* Image Previews */}
                        {imagePreviews.length > 0 && (
                            <div className="mb-4 grid grid-cols-4 gap-4">
                                {imagePreviews.map((preview, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={preview}
                                            alt={`Xem trước hình ảnh ${index + 1}`}
                                            className="w-64 h-64 object-cover rounded-md"
                                        />

                                        <button
                                            type="button"
                                            className="absolute top-0 right-0 text-red-500 pr-[2rem]"
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
                            {loadingIcon ? <FiLoader className="animate-spin" /> : ''}
                            <span>Thêm sản phẩm</span>
                        </button>
                    </form>
                </div>
            </div>{' '}
        </div>
    );
};

export default AddProduct;
