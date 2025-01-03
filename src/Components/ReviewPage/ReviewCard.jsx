import { notification, Rate } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import { isValidImageType } from '../../utils/IsValidImageType';
const desc = ['Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời'];
function ProductList({ id_product, name, price, img, values, setValues }) {
    const [value, setValue] = useState(3);
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = [];
        const newImagePreviews = [];

        files.forEach((element) => {
            if (isValidImageType(element)) {
                newImages.push(element);
                const previewUrls = URL.createObjectURL(element);
                newImagePreviews.push(previewUrls);
            } else {
                e.target.value = null;
                notification.error({
                    message: 'Thêm ảnh thất bại!',
                    description: 'Vui lòng chọn một file ảnh hợp lệ (JPEG, PNG, GIF, WEBP)',
                    duration: 1.5,
                });
            }
        });

        setImages([...images, ...newImages]);
        setImagePreviews([...imagePreviews, ...newImagePreviews]);
    };

    useEffect(() => {
        const newValues = values.map((item) => {
            if (item.id_product == id_product)
                return {
                    ...item,
                    images: images,
                };
            return item;
        });
        setValues(newValues);
    }, [images]);

    const handleRemoveImage = (indexToRemove) => {
        setImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
        setImagePreviews((prevPreviews) => prevPreviews.filter((_, index) => index !== indexToRemove));
    };
    return (
        <div className="flex flex-col w-[60%] mx-auto p-3 my-3 border rounded-lg gap-3 bg-gray-100">
            <p className="text-[20px] font-semibold  ">Đánh giá sản phẩm</p>
            <div className="flex gap-3 p-2 rounded bg-white">
                <img src={img} alt="" className="w-[10%] h-[75px]" />
                <div className="w-[90%]">
                    <div className="flex">
                        <span className="text-[17px] font-semibold">{name}</span>
                        <span className="ml-auto mr-3 italic font-semibold text-red-500 ">{price}</span>
                    </div>
                </div>
            </div>
            <div className="flex gap-6 ">
                <span className="">Chất lượng sản phẩm</span>
                <div className="flex mt-1">
                    <Rate
                        tooltips={desc}
                        onChange={(value) => {
                            const newValues = values.map((item) => {
                                if (item.id_product == id_product)
                                    return {
                                        ...item,
                                        rating: value,
                                    };
                                return item;
                            });
                            setValues(newValues);
                            setValue(value);
                        }}
                        value={value}
                    />
                    {value ? <span className="mx-2 text-[13px]">{desc[value - 1]}</span> : null}
                </div>
            </div>

            <div className="mb-2">
                <span className="block mb-2">Hình ảnh sản phẩm</span>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="w-full p-3 border rounded-sm focus:outline-none"
                    required={images.length === 0}
                />
            </div>
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
                                className="absolute top-0 right-0 text-red-500 pr-1"
                                onClick={() => handleRemoveImage(index)}
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <p>Bình luận</p>
            <div className="mb-3">
                <TextArea
                    className=""
                    showCount
                    maxLength={100}
                    placeholder="Để lại bình luận ở đây"
                    style={{
                        height: 120,
                        resize: 'none',
                    }}
                    onChange={(e) => {
                        const newValues = values.map((item) => {
                            if (item.id_product == id_product)
                                return {
                                    ...item,
                                    content: e.target.value,
                                };
                            return item;
                        });
                        setContent(e.target.value);
                        setValues(newValues);
                    }}
                />
            </div>
        </div>
    );
}

export default ProductList;
