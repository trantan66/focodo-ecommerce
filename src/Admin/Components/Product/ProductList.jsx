import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { Pagination } from "antd";

const data = [
  {
    product: {
      name: "Doraemon Plush Toy",
      imagelink:
        "https://cdn.tuoitre.vn/471584752817336320/2024/6/3/doraemon-3-17173722166781704981911.jpeg",
      description:
        "A cute plush toy of Doraemon, the famous robot cat from the future.",
    },
    category: {
      name: "Toys",
      imagelink:
        "https://cdn.tuoitre.vn/471584752817336320/2024/6/3/doraemon-3-17173722166781704981911.jpeg",
      description: "Fun and entertaining toys for all ages.",
    },
    originalprice: 55000, // Random price between 20000 and 90000
    discount: 15, // Discount in percentage
    saleprice: 46750, // originalprice * (1 - discount / 100)
    quantity: 20,
  },
  {
    product: {
      name: "Doraemon Action Figure",
      imagelink:
        "https://cdn.tuoitre.vn/471584752817336320/2024/6/3/doraemon-3-17173722166781704981911.jpeg",
      description: "A collectible Doraemon action figure with moving parts.",
    },
    category: {
      name: "Collectibles",
      imagelink:
        "https://cdn.tuoitre.vn/471584752817336320/2024/6/3/doraemon-3-17173722166781704981911.jpeg",
      description: "High-quality collectibles from your favorite characters.",
    },
    originalprice: 78000,
    discount: 10, // Discount in percentage
    saleprice: 70200,
    quantity: 15,
  },
  {
    product: {
      name: "Doraemon Puzzle Set",
      imagelink:
        "https://cdn.tuoitre.vn/471584752817336320/2024/6/3/doraemon-3-17173722166781704981911.jpeg",
      description: "A fun puzzle set featuring Doraemon and his friends.",
    },
    category: {
      name: "Puzzles",
      imagelink:
        "https://cdn.tuoitre.vn/471584752817336320/2024/6/3/doraemon-3-17173722166781704981911.jpeg",
      description: "Challenging puzzles for all puzzle lovers.",
    },
    originalprice: 64000,
    discount: 20, // Discount in percentage
    saleprice: 51200,
    quantity: 100,
  },
  {
    product: {
      name: "Doraemon Keychain",
      imagelink:
        "https://cdn.tuoitre.vn/471584752817336320/2024/6/3/doraemon-3-17173722166781704981911.jpeg",
      description: "A small Doraemon keychain for your bags or keys.",
    },
    category: {
      name: "Accessories",
      imagelink:
        "https://cdn.tuoitre.vn/471584752817336320/2024/6/3/doraemon-3-17173722166781704981911.jpeg",
      description: "Cute and stylish accessories for everyday use.",
    },
    originalprice: 30000,
    discount: 5, // Discount in percentage
    saleprice: 28500,
    quantity: 500,
  },
  {
    product: {
      name: "Doraemon Notebook",
      imagelink:
        "https://cdn.tuoitre.vn/471584752817336320/2024/6/3/doraemon-3-17173722166781704981911.jpeg",
      description: "A cute Doraemon-themed notebook for writing and drawing.",
    },
    category: {
      name: "Stationery",
      imagelink:
        "https://cdn.tuoitre.vn/471584752817336320/2024/6/3/doraemon-3-17173722166781704981911.jpeg",
      description: "Fun and functional stationery for school or office.",
    },
    originalprice: 45000,
    discount: 10, // Discount in percentage
    saleprice: 40500,
    quantity: 0,
  },
];

const onShowSizeChange = (current, pageSize) => {
  console.log(current, pageSize);
};

function ProductList() {
  return (
    <div className="m-4 h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
        <strong className="text-gray-700 font-medium">
          Danh sách sản phẩm
        </strong>
        <div className="mt-3">
          <table className="w-full text-gray-700 border-x-gray-400">
            <thead>
              <tr className="bg-[#FAFAFA] h-10">
                <td>Sản phẩm</td>
                <td>CATEGORY</td>
                <td>Giá gốc</td>
                <td>Discount</td>
                <td>Giá bán</td>
                <td>Số lượng</td>
              </tr>
            </thead>
            <tbody className="h-[50vh]">
              {data.map((dataproduct) => (
                <tr key={dataproduct.id} className="border-b-2">
                  <td>
                    <div className="bg-white rounded-sm flex-1 flex items-center">
                      <img
                        src={dataproduct.product.imagelink}
                        alt="User Avatar"
                        className="w-10 h-10 rounded-sm object-cover"
                      />
                      <div className="pl-2">
                        <Link
                          to={`customer/customerdetail/${dataproduct.product.name}`}
                          className="text text-sm font-semibold text-[#787BFF]"
                        >
                          {dataproduct.product.name}
                        </Link>
                        <div className="flex items-center">
                          <strong className="text-xs textsize text-gray-700 font-light">
                            {dataproduct.product.description}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="bg-white rounded-sm flex-1 flex items-center">
                      <img
                        src={dataproduct.category.imagelink}
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="pl-2">
                        <Link
                          to={`customer/customerdetail/${dataproduct.category.name}`}
                          className="text text-sm font-semibold text-[#787BFF]"
                        >
                          {dataproduct.category.name}
                        </Link>
                      </div>
                    </div>
                  </td>

                  <td>{dataproduct.originalprice} đ</td>
                  <td>{dataproduct.discount}%</td>
                  <td>{dataproduct.saleprice} đ</td>
                  <td>
                    <span
                      className={classNames(
                        dataproduct.quantity === 0
                          ? "capitalize py-1 px-2 rounded-md text-xs bg-red-300 text-red-500"
                          : dataproduct.quantity > 50
                          ? "capitalize py-1 px-2 rounded-md text-xs bg-green-300 text-green-500"
                          : "capitalize py-1 px-2 rounded-md text-xs bg-amber-100 text-amber-300",
                        "text-xs font-medium"
                      )}
                    >
                      {dataproduct.quantity === 0
                        ? "Hết hàng"
                        : dataproduct.quantity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
            defaultCurrent={3}
            total={500}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductList;
