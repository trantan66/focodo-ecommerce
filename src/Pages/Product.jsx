import React from "react";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Rate } from "antd";
import banhxeonemlui from "../Components/Shared/image/banhxeo-nemlui.jpg";
import banhbeo from "../Components/Shared/image/banhbeo.jpg";
import banhnam from "../Components/Shared/image/banhnam.jpg";
import comhen from "../Components/Shared/image/comhen.jpg";
import banhloc from "../Components/Shared/image/banhloc.jpg";
import bunbohue from "../Components/Shared/image/bunbohue.jpg";

function Filter() {
  return (
    <div className="">
      <label htmlFor="" className="text-xl ">
        Danh mục sản phẩm
      </label>
      <div class="w-full h-0.5 bg-black mt-2 mb-4"></div>
      <div className="mb-3">
        <Input
          size="large"
          placeholder="Tìm sản phẩm"
          prefix={<SearchOutlined />}
        />
      </div>
      <div className="leading-loose">
        <a href="" className="hover:text-orange-500 hover:no-underline">
          Tất cả
        </a>
        <br></br>
        <a href="" className="hover:text-orange-500 hover:no-underline">
          Khuyến mãi
        </a>
        <br></br>
        <a href="" className="hover:text-orange-500 hover:no-underline">
          Bánh bèo
        </a>
        <br></br>
        <a href="" className="hover:text-orange-500 hover:no-underline">
          Bánh nậm
        </a>
        <br></br>
        <a href="" className="hover:text-orange-500 hover:no-underline">
          Cơm hến
        </a>
        <br></br>
        <a href="" className="hover:text-orange-500 hover:no-underline">
          Bánh xèo
        </a>
      </div>
    </div>
  );
}

function ProductList(props) {
  return (
    <div className="flex flex-col item-center justify-between border border-black rounded-lg w-[266.67px] h-[400px] bg-[#F6F6F6]">
      <div className="flex justify-center items-center mt-2">
        <Rate></Rate>
      </div>
      <img
        src={props.image}
        alt=""
        className="w-[160px] h-[160px] mx-auto mt-2 "
      />
      <span className="mx-auto italic font-semibold text-[16px]">
        {props.name}
      </span>
      <span className="mx-auto italic font-semibold text-[24px]">
        {props.price}
      </span>
      <button className="bg-black text-white mx-auto mb-3 w-[193px] h-[48px] rounded-lg hover:bg-[#3C3D37] transition duration-300">
        Mua ngay
      </button>
    </div>
  );
}

function Product() {
  return (
    <div>
      <div>This is Product page</div>
      <Link className="underline" to="/">
        to home
      </Link>
      <div className="flex justify-center">
        <Filter></Filter>
        <div className="">
          <div className="flex ml-10">
            <p>
              Số lượng sản phẩm: <span class="font-bold">85</span>
            </p>
            <select className="border border-gray-300 p-2 rounded ml-[600px]">
              <option>By rating</option>
              <option>Price low to high</option>
              <option>Price high to low</option>
            </select>
          </div>
          <div className="grid grid-cols-3 ml-10 mt-3 gap-4 ">
            <ProductList
              image={banhxeonemlui}
              name="Bánh xèo"
              price="10.000đ"
            ></ProductList>
            <ProductList
              image={banhbeo}
              name="Bánh bèo"
              price="43.000đ"
            ></ProductList>
            <ProductList
              image={banhnam}
              name="Bánh nậm"
              price="3.000đ"
            ></ProductList>
            <ProductList
              image={comhen}
              name="Cơm hến"
              price="12.000đ"
            ></ProductList>
            <ProductList
              image={banhloc}
              name="Bánh lọc"
              price="29.000đ"
            ></ProductList>
            <ProductList
              image={bunbohue}
              name="Bún bò Huế"
              price="56.000đ"
            ></ProductList>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
