import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../CustomCss/Slider.css';


function ProductDetail() {
  const { productId } = useParams();

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
    console.log("Product:", productData);

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
    setProductName("");
    setDescription("");
    setSubDescription("");
    setProductQuantity("");
    setPrice("");
    setDiscount("");
    setCategory("");
    setImages([]);
    setImagePreviews([]);
  };

  const slides = [
    {
      image:
        "https://cdn.tuoitre.vn/471584752817336320/2024/6/3/doraemon-3-17173722166781704981911.jpeg",
      title: "Slide 1",
      description: "This is slide 1",
    },
    {
      image:
        "https://cdn.popsww.com/blog-kids/sites/3/2021/12/Nobita-Nobi-Nobita.jpg",
      title: "Slide 2",
      description: "This is slide 2",
    },
    {
      image:
        "https://cdn.tuoitre.vn/471584752817336320/2024/6/3/doraemon-3-17173722166781704981911.jpeg",
      title: "Slide 3",
      description: "This is slide 3",
    },
    {
      image:
        "https://cdn.popsww.com/blog-kids/sites/3/2021/12/Nobita-Nobi-Nobita.jpg",
      title: "Slide 4",
      description: "This is slide 4",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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
        <div className="flex items-center flex-col flex-[1] bg-[#282941] mr-2 mb-4 max-h-[28rem]">
          <div className="slider-container w-full flex flex-col items-center justify-center">
            <Slider {...settings}>
              {slides.map((slide, index) => (
                <div key={index}>
                  <div className="rounded-lg w-full p-4">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-[15rem] object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-white text-xl font-semibold">
                        {slide.title}
                      </h3>
                      <p className="text-white">{slide.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="flex-[2] bg-[#282941] px-4 py-3 mb-4">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row gap-4 w-full p-1">
              <div className="flex items-center flex-col flex-[2]">
                <span className=" text-white mb-1 self-start">
                  Tên sản phẩm
                </span>
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
                <span className=" text-white mb-1 self-start ">
                  Discount (%)
                </span>
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
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border rounded-sm bg-[#282941] text-white focus:outline-none"
                placeholder="Nhập mô tả sản phẩm"
                rows="4"
                required
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
              Cập nhật sản phẩm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
