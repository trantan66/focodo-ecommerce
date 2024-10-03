import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useState } from "react";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [subdescription, setSubDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const salePrice = price - (price * discount) / 100;
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      productName,
      description,
      subdescription,
      price,
      discount,
      salePrice,
      category,
      images,
    };
    console.log("Product added:", productData);
    
    // Xử lý logic gửi sản phẩm lên server ở đây

    resetForm();
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

  const resetForm = () => {
    setProductName('');
    setDescription('');
    setSubDescription('');
    setProductQuantity('');
    setPrice('');
    setDiscount('');
    setCategory('');
    setImages([]);
    setImagePreviews([]);
  };

  return (
    <div className="flex gap-4 px-4 pb-4 flex-row">
      <div className="bg-[#282941] p-4 rounded-md  flex flex-col flex-[2]">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row gap-4 w-full p-1">
            <div className="flex items-center flex-col flex-[2]">
              <span className=" text-white mb-1 self-start">Tên sản phẩm</span>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="text-sm focus:outline-none border border-gray-300 w-full h-10 px-4 rounded-sm bg-[#282941] text-white mr-2 "
                placeholder="Tên sản phẩm"
                required
              />
            </div>
            <div className="flex items-center flex-col flex-[1]">
              <span className=" text-white mb-1 self-start">Số lượng</span>

              <input
                type="text"
                value={productQuantity}
                onChange={(e) => setProductQuantity(e.target.value)}
                className="text-sm focus:outline-none border border-gray-300 w-full h-10 px-4 pr-4 rounded-sm bg-[#282941] text-white "
                placeholder="Số lượng"
              />
            </div>
          </div>

          <div className="flex items-center flex-col">
            <span className="text-white mb-1 self-start">Danh mục</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-sm focus:outline-none border border-gray-300 w-full h-10 px-4 pr-4 rounded-sm bg-[#282941] text-white"
              required
            >
              <option value="">Chọn danh mục</option>
              <option value="Bánh">Bánh bột lọc</option>
              <option value="Mắm">abcd</option>
            </select>
          </div>

          <div className="flex flex-row gap-4 w-full p-1">
            <div className="flex items-center flex-col flex-1">
              <span className=" text-white mb-1 self-start">
                Giá sản phẩm (VND)
              </span>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="text-sm focus:outline-none border border-gray-300 w-full h-10 px-4 rounded-sm bg-[#282941] text-white mr-2 "
                placeholder="Giá sản phẩm"
                required
              />
            </div>
            <div className="flex items-center flex-col flex-1">
              <span className=" text-white mb-1 self-start ">Discount (%)</span>
              <input
                type="text"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="text-sm focus:outline-none border border-gray-300 w-full h-10 px-4 pr-4 rounded-sm bg-[#282941] text-white "
                placeholder="Số lượng"
              />
            </div>
          </div>

          <div className="mb-4">
            <span className="block text-white mb-2">Mô tả ngắn gọn</span>
            <textarea
              value={subdescription}
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
              data={description}
              onChange={(event, editor) => {
                const data = editor.getData();
                setDescription(data);
              }}
              config={{
                placeholder: "Nhập mô tả chi tiết sản phẩm...",
              }}
            />
          </div>

          <div className="mb-6">
            <span className="block text-white mb-2">Hình ảnh sản phẩm</span>
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
                    className="absolute top-0 right-0 bg-red-500 text-white p-2 rounded-md"
                    onClick={() => handleRemoveImage(index)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 p-3 rounded-md text-white hover:bg-blue-500"
          >
            Thêm sản phẩm
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
