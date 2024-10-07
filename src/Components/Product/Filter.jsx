import React from "react";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

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
        <Link href="" className="hover:text-orange-500 hover:no-underline">
          Tất cả
        </Link>
        <br></br>
        <Link href="" className="hover:text-orange-500 hover:no-underline">
          Khuyến mãi
        </Link>
        <br></br>
        <Link href="" className="hover:text-orange-500 hover:no-underline">
          Bánh bèo
        </Link>
        <br></br>
        <Link href="" className="hover:text-orange-500 hover:no-underline">
          Bánh nậm
        </Link>
        <br></br>
        <Link href="" className="hover:text-orange-500 hover:no-underline">
          Cơm hến
        </Link>
        <br></br>
        <Link href="" className="hover:text-orange-500 hover:no-underline">
          Bánh xèo
        </Link>
      </div>
    </div>
  );
}

export default Filter;
