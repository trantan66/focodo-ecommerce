import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Rate, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';
const desc = ['Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời'];
function ProductList(props) {
    const prop = {
        name: 'file',
        multiple: true,
        accept: 'image/*',
        action: '/upload', // API endpoint cho xử lý ảnh
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                console.log(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                console.log(`${info.file.name} file upload failed.`);
            }
        },
    };
    const [value, setValue] = useState(3);
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
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
    return (
        <div className="flex flex-col w-[60%] mx-auto p-3 my-3 border rounded-lg gap-3 bg-gray-100">
            <p className="text-[20px] font-semibold  ">Đánh giá sản phẩm</p>
            <div className="flex gap-3 p-2 rounded bg-white">
                <img src={props.img} alt="" className="w-[10%] h-[75px]" />
                <div className="w-[90%]">
                    <div className="flex">
                        <span className="text-[17px] font-semibold">{props.name}</span>
                        <span className="ml-auto mr-3 italic font-semibold text-red-500 ">{props.price}</span>
                    </div>
                </div>
            </div>
            <div className="flex gap-6 ">
                <span className="">Chất lượng sản phẩm</span>
                <div className="flex mt-1">
                    <Rate tooltips={desc} onChange={setValue} value={value} />
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
                />
            </div>
        </div>
    );
}

export default ProductList;
